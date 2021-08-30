<template>
  <div class="button__wrapper">
    <button @click="send('DEC')">-</button>
    <button @click="send('INC')">+</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from './store'

const { send } = useCounterStore()
</script>