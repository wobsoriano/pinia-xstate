<script setup lang="ts">
  interface Props {
    msg?: string
    labels?: string[]
  }

  // defineProps, defineEmits and defineExpose are compiler
  // macros only usable inside <script setup>
  const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
  })

  const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()

  const emitUpdate = (value: string) => {
    emit('update', value)
  }

  const emitChange = (id: number) => {
    emit('change', id)
  }

  // Explicitly expose properties in a <script setup> component
  const expose = defineExpose({ emitChange })
</script>