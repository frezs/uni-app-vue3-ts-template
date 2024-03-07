<template>
  <view class="relative g_w-750rpx g_top-0">
    <tm-navbar
      transprent
      :follow-dark="false"
      :follow-theme="false"
      :title="_title && title=='...' ? _title : title"
      hide-home
      home-color="white"
      font-color="white"
    >
      <template v-slot:right>
        <slot name="right"></slot>
      </template>
    </tm-navbar>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getCurrentParams, PageNames } from '@/router'
import { onMounted } from 'vue'
import { TODO_TYPE } from '@/api/modules/in-out/_enum'
import { usePageStore } from '@/store'

const _title = ref()
const usePage = usePageStore()
defineProps({
  title: {
    type: String,
    default: '...'
  },
  leftIcon: {
    type: Boolean,
    default: false
  }
})

defineEmits([])

onMounted(() => {
  const type = usePage.type
  console.log('===============navbar', type)
  _title.value = type && TODO_TYPE[type]
})
</script>
