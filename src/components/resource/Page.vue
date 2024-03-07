<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { getCurrentInstance, nextTick } from 'vue'
import { useAppRouterAfter, useAppRouterBefore } from '@/hooks/usePage'

const proxy = getCurrentInstance()?.proxy ?? null
let pages = getCurrentPages().pop()

nextTick(() => {
  useAppRouterBefore({
    path: pages?.route ?? '',
    context: proxy
  })
})

onLoad((opts: any) => {
  useAppRouterAfter({
    path: pages?.route ?? '',
    opts: opts,
    context: proxy
  })
})

</script>