<template>
  <view class="g_w-100vw">
    <view class="g_fixed g_w-full g_h-400rpx g_top-0">
      <view class="absolute g_z--8 g_top-0 g_left-20%">
        <Image class="g_w-468rpx" src="@/static/index_nav_top.png"/>
      </view>
      <view class="absolute g_w-100vw g_h-392rpx g_gradient-b g_z--9"></view>
      <view class="g_gradient-b g_opacity-40 g_absolute g_w-full g_h-400rpx g_z--8"></view>
    </view>
    <view class="g_relative g_z-0 g_fixed">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Image from '@/components/resource/Image.vue'

defineProps({
  /** 隐藏logo */
  hiddenLogo: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
</style>
