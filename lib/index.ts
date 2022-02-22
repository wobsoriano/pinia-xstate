import { StateMachine, Interpreter, interpret } from "xstate";
import { markRaw, ref, Ref } from "vue";

export type Store<M> = M extends StateMachine<
  infer Context,
  infer Schema,
  infer Event,
  infer State,
  infer _A,
  infer _B,
  infer _C
>
  ? {
      state: Ref<Interpreter<Context, Schema, Event, State>["state"]>;
      send: Interpreter<Context, Schema, Event, State>["send"];
      service: Interpreter<Context, Schema, Event, State>;
    }
  : never;

function xstate<M extends StateMachine<any, any, any, any, any, any, any>>(
  machine: M
) {
  const service = interpret(machine);
  return () => {
    const state = ref(machine.initialState);
    service
      .onTransition((nextState) => {
        const initialStateChanged =
          nextState.changed === undefined &&
          Object.keys(nextState.children).length;

        if (nextState.changed || initialStateChanged) {
          state.value = nextState;
        }
      })
      .start();
    return {
      state,
      send: markRaw(service.send),
      service: markRaw(service),
    } as Store<M>;
  };
}

export default xstate;
