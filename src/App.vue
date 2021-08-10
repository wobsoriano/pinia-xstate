<template>
  <button @click="send('TOGGLE')">
    {{
    state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'
    }}
  </button>
</template>

<script setup lang="ts">
import useMachine from '../lib'
import { toggleMachine } from './store'
import Another from './components/Another.vue'

const {state, send} = useMachine(toggleMachine)

// const {state, send} = useMachine();
// console.log(state)
</script>