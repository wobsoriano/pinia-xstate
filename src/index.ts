import { createActor } from 'xstate'
import type { Actor, ActorOptions, AnyStateMachine, MaybeLazy, StateFrom } from 'xstate'
import type { Ref } from 'vue'
import { markRaw, shallowRef } from 'vue'

type Prop<T, K> = K extends keyof T ? T[K] : never;

type UseMachineReturn<
  TMachine extends AnyStateMachine,
  TInterpreter = Actor<TMachine>
> = {
  state: Ref<StateFrom<TMachine>>;
  send: Prop<TInterpreter, 'send'>;
  service: TInterpreter;
};

function xstate<TMachine extends AnyStateMachine>(
  machine: MaybeLazy<TMachine>,
  interpreterOptions?: ActorOptions<TMachine>,
) {
  const actor = createActor(machine as any, interpreterOptions)
  let snapshot = actor.getSnapshot()

  return () => {
    const state = shallowRef(snapshot)

    actor
    .subscribe((nextSnapshot) => {
      if (nextSnapshot !== snapshot) {
        snapshot = nextSnapshot
        state.value = snapshot
      }
    })

    actor.start()

    return {
      state,
      send: markRaw(actor.send),
      service: markRaw(actor),
    } as UseMachineReturn<TMachine>
  }
}

export default xstate
