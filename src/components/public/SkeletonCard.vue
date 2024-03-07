<template>
  <view class="g_rounded-15rpx g_mt-30rpx" :style="{ background: bgColor }">
    <view class="w-full g_h-15rpx"></view>
    <tm-skeleton-line v-for="_ in col" class="g_mx-30rpx" :height="50"></tm-skeleton-line>
    <view class="w-full g_h-15rpx"></view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  col: {
    type: Number,
    default: 3
  },
  bgColor: {
    type: String,
    default: 'white'
  }
})
</script>

<style lang="scss" scoped></style>
