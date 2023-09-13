# pinia-xstate

[![npm version](https://badge.fury.io/js/pinia-xstate.svg)](https://badge.fury.io/js/pinia-xstate)
[![bundle size](https://badgen.net/bundlephobia/minzip/pinia-xstate)](https://bundlephobia.com/result?p=pinia-xstate)

This middleware allows you to easily put your [xstate](https://github.com/statelyai/xstate) state machines into a global [pinia](https://pinia.esm.dev/) store.

## Installation

```bash
npm install pinia xstate pinia-xstate
```

## Usage

```ts
import { defineStore } from 'pinia'
import { createMachine } from 'xstate'
import xstate from 'pinia-xstate'

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
});

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
    <button @click="store.send('TOGGLE')">
        {{state.value === 'inactive'
            ? 'Click to activate'
            : 'Active! Click to deactivate'}}
    </button>
</template>
```

## API

### `xstate(machine, options)`

A function that creates an actor from the given machine and starts a service for it. The service is then added to the pinia store.

### Arguments

- `machine` - An [XState machine](https://xstate.js.org/docs/guides/machines.html).
- `options` (optional) - [Actor options](https://xstate.js.org/docs/guides/interpretation.html#options) OR one of the following Machine Config options: `guards`, `actions`, `activities`, `services`, `delays`, `immediate`, `context`, or `state`.

## License

MIT
