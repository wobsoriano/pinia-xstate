import { interpret } from 'xstate'
import type { StateMachine, Interpreter, InterpreterOptions } from 'xstate'
import type { Ref } from 'vue'
import { markRaw, ref } from 'vue'

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
  if (interpreterOptions) {
    console.log('INTERPRETER OPTIONS WERE PASSED:', interpreterOptions)
    console.log('INITIAL STATE FOR HYDRATION: ', initialState)
  }
  return () => {
    const state = ref(initialState)
    service
      .onTransition((nextState) => {
        const initialStateChanged =
          nextState.changed === undefined &&
          Object.keys(nextState.children).length

        if (nextState.changed || initialStateChanged) {
          state.value = nextState
        }
      })
      .start(initialState)
    return {
      state,
      send: markRaw(service.send),
      service: markRaw(service),
    } as Store<M>
  }
}

export default xstate
