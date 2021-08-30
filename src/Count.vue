<template>
    <h1 class="count" v-text="store.state.context.count"></h1>
</template>

<script setup lang="ts">
import { useCounterStore } from './store'

const store = useCounterStore()
</script>