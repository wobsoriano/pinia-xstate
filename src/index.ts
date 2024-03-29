import { createActor } from 'xstate'
import type {
  ActorOptions,
  ActorRefFrom,
  AnyActorLogic,
  EventFromLogic,
  SnapshotFrom,
} from 'xstate'
import type { Ref, UnwrapRef } from 'vue'
import { markRaw, shallowRef } from 'vue'

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
    const snapshotRef: Ref<UnwrapRef<SnapshotFrom<M>>> = shallowRef(
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

/**
 * @deprecated Use `import { xstate } from 'xstate'` instead
 */
const deprecatedImport = xstate

export default deprecatedImport
