<template>
  <slot v-if="Object.keys(slots).includes(name)" :name="name"></slot>
  <slot v-else></slot>
</template>

<script lang="ts" setup>
import { onMounted, useSlots } from 'vue'

const slots = useSlots()
defineProps(['name'])

onMounted(() => {
  console.log('===============context', Object.keys(slots))
})

</script>