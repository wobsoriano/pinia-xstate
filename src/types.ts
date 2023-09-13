import { ActorOptions, AnyStateMachine, AreAllImplementationsAssumedToBeProvided, InternalMachineImplementations, TODO } from "xstate";

export type RestParams<TMachine extends AnyStateMachine> =
  AreAllImplementationsAssumedToBeProvided<
    TMachine['__TResolvedTypesMeta']
  > extends false
    ? ActorOptions<TMachine> &
      InternalMachineImplementations<
        TMachine['__TContext'],
        TMachine['__TEvent'],
        TODO,
        TODO,
        TODO,
        TMachine['__TResolvedTypesMeta'],
        true
      >
    : ActorOptions<TMachine> &
    InternalMachineImplementations<
      TMachine['__TContext'],
      TMachine['__TEvent'],
      TODO,
      TODO,
      TODO,
      TMachine['__TResolvedTypesMeta']
    >;
