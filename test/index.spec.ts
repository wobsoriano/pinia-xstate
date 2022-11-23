import { createPinia, defineStore, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { assign, createMachine } from 'xstate'
import xstate from '../src'

const increment = context => context.count + 1
const decrement = context => context.count - 1

const counterMachine = createMachine({
  predictableActionArguments: true,
  id: 'counter',
  initial: 'active',
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) },
      },
    },
  },
})

const useCounterStore = defineStore(counterMachine.id, xstate(counterMachine))

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('increments', () => {
    const store = useCounterStore()
    expect(store.state.context.count).toBe(0)
    store.send('INC')
    store.send('INC')
    expect(store.state.context.count).toBe(2)
  })

  test('decrements', () => {
    const store = useCounterStore()
    store.send('DEC')
    expect(store.state.context.count).toBe(1)
    store.send('DEC')
    expect(store.state.context.count).toBe(0)
  })
})
