<template>
  <view class="relative g_center">
    <image mode="widthFix" :src="convert(src)"></image>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { pathConvert } from '@/utils'
import { BASE_URL } from '@/config/http'

let convert: any = null

// 路径转换解决资源加载错误的问题
// #ifdef APP-NVUE
convert = val => pathConvert(val, '@/static', BASE_URL + '/static/app/static')
// #endif

// #ifndef APP-NVUE
convert = val => pathConvert(val, '@/static', '/static')
// #endif

defineProps({
  src: {
    type: String,
    default: '/static/logo.png'
  }
})
</script>

<style scoped>
image {
  width: 100%;
  height: 100%;
}
</style>
