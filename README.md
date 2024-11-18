# pinia-xstate

Put your [xstate](https://github.com/statelyai/xstate) state machines into a global [pinia](https://pinia.esm.dev/) store.

> This branch is for XState v5. If you're in Xstate v4, go [here](https://github.com/wobsoriano/pinia-xstate/tree/xstate-v4) instead.

## Installation

```bash
npm install xstate pinia-xstate
```

## Usage

```ts
import { defineStore } from 'pinia'
import { xstate } from 'pinia-xstate'
import { createMachine } from 'xstate'

export const toggleMachine = createMachine({
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
})

// create a store using the xstate middleware
export const useToggleStore = defineStore(
  toggleMachine.id,
  xstate(toggleMachine)
)
```

```vue
<script setup>
import { useToggleStore } from './store/toggle'

const store = useToggleStore()
</script>

<template>
  <button @click="store.send({ type: 'TOGGLE' })">
    {{ store.state.value === 'inactive'
      ? 'Click to activate'
      : 'Active! Click to deactivate' }}
  </button>
</template>
```

## License

MIT
