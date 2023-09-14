import { createActor } from 'xstate';
import type {
  ActorOptions,
  ActorRefFrom,
  AnyActorLogic,
  EventFromLogic,
  PersistedStateFrom,
  SnapshotFrom,
} from 'xstate';
import type { Ref, UnwrapRef } from 'vue';
import { markRaw, ref } from 'vue';

export type Store<M extends AnyActorLogic> = {
  state: SnapshotFrom<M>;
  send: (event: EventFromLogic<M>) => void;
  actor: ActorRefFrom<M>;
};

function xstate<M extends AnyActorLogic>(
  actorLogic: M,
  interpreterOptions?: ActorOptions<M>,
  initialState?: PersistedStateFrom<M>
) {
  const actorRef = createActor(actorLogic, {
    ...interpreterOptions,
    state: initialState,
  });
  return () => {
    const snapshotRef: Ref<UnwrapRef<SnapshotFrom<M>>> = ref(
      actorRef.getSnapshot()
    );
    actorRef.subscribe((nextState) => {
      snapshotRef.value = nextState;
    });
    actorRef.start();

    return {
      state: snapshotRef,
      send: markRaw(actorRef.send),
      actor: markRaw(actorRef),
    } as Store<M>;
  };
}

export default xstate;
