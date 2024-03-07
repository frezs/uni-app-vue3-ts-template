<template>
  <view class="g_fixed g_w-750">
    <view class="g_mx-30rpx">
      <Image class="g_w-full g_top--157rpx" src="@/static/index_login_top.png"/>
      <view class="g_relative g_w-full g_h-100">
        <view
          v-if="!hiddenLogo"
          class="g_relative g_flex g_flex-col g_center g_top-[-200rpx] g_z-[9999]"
        >
          <view class="g_w-50px g_h-50px">
            <image src="@/static/logo.png"/>
          </view>
          <view class="g_text-40 font-bold g_color-#000 g_mt-20rpx">中国烟草</view>
          <view class="g_text-22 g_color-#000 g_mt-10rpx">CHINA TOBACCO</view>
        </view>
      </view>
      <view class="g_relative g_z-[9999]">
        <slot></slot>
      </view>
    </view>
    <view class="g_fixed g_bottom-[-15rpx] g_w-750">
      <view class="g_gradient-t g_opacity-40 g_absolute g_w-full g_h-full g_z-[-1]"></view>
      <Image class="g_w-full g_z--2" src="@/static/index_login_bot.png"/>
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

<style lang="scss">
image {
  width: 100%;
  height: 100%;
}
</style>
