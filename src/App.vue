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
import { watchEffect } from 'vue'

const { state, send, service } = useMachine(toggleMachine)
</script>