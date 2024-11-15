import type {
  ActorOptions,
  ActorRefFrom,
  AnyActorLogic,
  EventFromLogic,
  SnapshotFrom,
} from 'xstate'
import { markRaw, shallowRef } from 'vue'
import { createActor } from 'xstate'

export interface Store<M extends AnyActorLogic> {
  state: SnapshotFrom<M>
  send: (event: EventFromLogic<M>) => void
  actor: ActorRefFrom<M>
}

export function xstate<M extends AnyActorLogic>(
  actorLogic: M,
  actorOptions?: ActorOptions<M>,
) {
  const actorRef = createActor(actorLogic as any, actorOptions)
  return () => {
    const snapshotRef = shallowRef<SnapshotFrom<M>>(
      actorRef.getSnapshot(),
    )
    actorRef.subscribe((nextState) => {
      snapshotRef.value = nextState
    })
    actorRef.start()

    return {
      state: snapshotRef,
      send: markRaw(actorRef.send),
      actor: markRaw(actorRef),
    } as Store<M>
  }
}
