<template>
  <div>
      <div>{{store.state.context.count}}</div>
  <button @click="store.send('INC')">+</button>
  <button @click="store.send('DEC')">-</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../lib'
const store = useStore()
</script>