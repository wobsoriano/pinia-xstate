# pinia-xstate

This composable allows you to easily put your [xstate](https://github.com/statelyai/xstate) state machines into a global [pinia](https://pinia.esm.dev/) store.

## Installation

```sh
yarn add pinia-xstate
```

## Usage

```html
<template>
  <button @click="send('TOGGLE')">
    {{
    state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'
    }}
  </button>
</template>

<script setup>
import { createMachine } from 'xstate';
import useMachine from 'pinia-xstate'

// create your machine
const machine = createMachine({
  id: 'machine',
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

// pass the machine to the pinia-xstate composable
const { state, send, service } = useMachine(machine);
</script>
```