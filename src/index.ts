import { createActor } from 'xstate'
import type { Actor, AnyStateMachine, MaybeLazy, Prop, StateFrom } from 'xstate'
import type { Ref } from 'vue'
import { markRaw, shallowRef } from 'vue'
import { RestParams } from './types';

type MachineStoreReturn<
  TMachine extends AnyStateMachine,
  TInterpreter = Actor<TMachine>
> = {
  state: Ref<StateFrom<TMachine>>;
  send: Prop<TInterpreter, 'send'>;
  service: TInterpreter;
};

function xstate<TMachine extends AnyStateMachine>(
  machine: MaybeLazy<TMachine>,
  options: RestParams<TMachine> = {},
) {
  const { guards, actions, actors, delays, ...interpreterOptions } = options;

  const machineConfig = {
    guards,
    actions,
    actors,
    delays
  };

  // @ts-expect-error: Missing internal type
  const machineWithConfig = machine.provide(machineConfig);

  const actor = createActor(machineWithConfig, interpreterOptions).start()

  let snapshot = actor.getSnapshot()

  return () => {
    const state = shallowRef(snapshot)

    actor.subscribe((nextSnapshot) => {
      if (nextSnapshot !== snapshot) {
        snapshot = nextSnapshot
        state.value = snapshot
      }
    })

    return {
      state,
      send: markRaw(actor.send),
      service: markRaw(actor),
    } as MachineStoreReturn<TMachine>
  }
}

export default xstate
