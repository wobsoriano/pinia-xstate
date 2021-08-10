<template>
  <div>Status: {{ state.value }}</div>
</template>

<script setup lang="ts">
import useMachine from '.././../lib'
import { toggleMachine } from '../store'

const { state } = useMachine(toggleMachine);
</script>