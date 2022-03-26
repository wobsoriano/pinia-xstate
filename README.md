# pinia-xstate

[![npm version](https://badge.fury.io/js/pinia-xstate.svg)](https://badge.fury.io/js/pinia-xstate)
[![bundle size](https://badgen.net/bundlephobia/minzip/pinia-xstate)](https://bundlephobia.com/result?p=pinia-xstate)

This middleware allows you to easily put your [xstate](https://github.com/statelyai/xstate) state machines into a global [pinia](https://pinia.esm.dev/) store.

## Installation

```bash
pnpm add pinia xstate pinia-xstate # or npm or yarn
```

## Usage

```ts
import { defineStore } from 'pinia'
import { createMachine, assign } from 'xstate'
import xstate from 'pinia-xstate'

const increment = (context) => context.count + 1
const decrement = (context) => context.count - 1

export const counterMachine = createMachine({
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

// create a store using the xstate middleware
export const useCounterStore = defineStore(
  counterMachine.id,
  xstate(counterMachine)
)

// use the store in your components
const store = useCounterStore()

store.state.context.count
store.send('INC')
store.send('DEC')
```

## License

MIT
