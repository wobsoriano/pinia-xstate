import { StateMachine, Interpreter, interpret } from 'xstate';
import { defineStore } from 'pinia';
import { ComputedRef, shallowRef, computed, onUnmounted } from 'vue';

export type Store<M> = M extends StateMachine<
  infer Context,
  infer Schema,
  infer Event,
  infer State
>
  ? {
      state: ComputedRef<Interpreter<Context, Schema, Event, State>["state"]>;
      send: Interpreter<Context, Schema, Event, State>["send"];
      service: Interpreter<Context, Schema, Event, State>;
    }
  : never;

export default function useMachine<M extends StateMachine<any, any, any, any>>(machine: M) {
    const service = interpret(machine);
    const { initialState } = service.machine;
    const useStore = defineStore(service.id, () => {
        const state = shallowRef(initialState);
        service.onTransition((nextState) => {
            const initialStateChanged = nextState.changed === undefined && Object.keys(nextState.children).length;
            if (nextState.changed || initialStateChanged) {
                state.value = nextState;
            }
        }).start();
        onUnmounted(service.stop);
        return { state }
    });
    const store = useStore();
    return {
        state: computed(() => store.state),
        send: service.send,
        service
    } as Store<M>;
}