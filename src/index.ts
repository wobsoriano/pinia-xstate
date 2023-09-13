import { State, interpret } from 'xstate'
import type { Interpreter, InterpreterOptions, StateMachine } from 'xstate'
import type { Ref } from 'vue'
import { markRaw, ref } from 'vue'

export type Store<M> = M extends StateMachine<
  infer Context,
  infer Schema,
  infer Event,
  infer State,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _A,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _B,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _C
>
  ? {
    state: Ref<Interpreter<Context, Schema, Event, State>['state']>
    send: Interpreter<Context, Schema, Event, State>['send']
    service: Interpreter<Context, Schema, Event, State>
  }
  : never

function xstate<M extends StateMachine<any, any, any, any, any, any, any>>(
  machine: M,
  interpreterOptions?: InterpreterOptions,
  initialState = machine.initialState,
) {
  const service = interpret(machine, interpreterOptions)
  return () => {
    const state = ref(initialState)
    service
      .onTransition((nextState) => {
        const initialStateChanged
          = nextState.changed === undefined
          && Object.keys(nextState.children).length

        if (nextState.changed || initialStateChanged)
          state.value = nextState
      })
      .start(State.create(initialState))

    return {
      state,
      send: markRaw(service.send),
      service: markRaw(service),
    } as Store<M>
  }
}

export default xstate
