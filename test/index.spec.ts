import { createPinia, defineStore, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { createMachine } from 'xstate'
import xstate from '../src'

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

const useToggleStore = defineStore(toggleMachine.id, xstate(toggleMachine))

describe('xstate', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('toggles', () => {
    const store = useToggleStore()
    expect(store.state.value).toBe('inactive')
    store.send({ type: 'TOGGLE' })
    expect(store.state.value).toBe('active')
    store.send({ type: 'TOGGLE' })
    expect(store.state.value).toBe('inactive')
  })
})
