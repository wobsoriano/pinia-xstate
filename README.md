# pinia-xstate

This middleware allows you to easily put your [xstate](https://github.com/statelyai/xstate) state machines into a global [pinia](https://pinia.esm.dev/) store.

## Installation

```sh
yarn add pinia-xstate
```

## Usage

```ts
import { defineStore } from 'pinia';
import { createMachine, assign } from 'xstate';
import xstate from 'pinia-xstate';

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

export const counterMachine = createMachine({
  id: 'counter',
  initial: 'active',
  context: {
    count: 0
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) }
      }
    }
  }
});

// create a hook using the xstate middleware
export const useCounterStore = defineStore(counterMachine.id, xstate(counterMachine))

// use the store in your components
const store = useCounterStore()

store.state.context.count
store.send('INC')
store.send('DEC')
```