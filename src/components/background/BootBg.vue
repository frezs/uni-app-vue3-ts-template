<template>
  <view class="g_flex-col">
    <view class="g_w-750">
      <view class="g_fixed g_top-0 g_mx-30rpx g_w-full">
        <Image class="g_top--157rpx g_w-full" src="@/static/index_login_top.png"/>
        <view class="g_relative g_z-9999">
          <slot></slot>
        </view>
      </view>
      <view class="g_fixed g_bottom-[-40rpx] g_w-full">
        <view class="g_absolute g_w-full g_fixed g_bottom-20vh">
          <view v-if="!bootLogo" class="g_flex g_flex-col g_center">
            <Image class="g_w-50px g_h-50px" src="@/static/logo.png"/>
            <view class="g_text-40 font-bold g_color-#000 g_mt-20rpx">独立应用开发(接外包)</view>
            <view class="g_text-22 g_color-#000 g_mt-10rpx">Built by guzi</view>
          </view>
          <view v-if="!welcome" class="g_flex g_flex-col g_center g_mt-15vh">
            <view class="g_flex g_flex-row g_center">
              <view
                class="g_w-40rpx g_h-2rpx g_bg-gradient-to-l g_from-#fda51b g_to-transparent"
              ></view>
              <view class="g_text-28 g_font-bold g_color-#fda51b g_mx-20rpx">Welcome</view>
              <view
                class="g_w-40rpx g_h-2rpx g_bg-gradient-to-r g_from-#fda51b g_to-transparent"
              ></view>
            </view>
            <view class="g_text-22 g_color-#000 g_mt-22rpx">{{ welcome }}</view>
          </view>
        </view>
        <view
          class="g_gradient-t g_opacity-40 g_absolute g_w-full g_h-full g_z-[-1]"
        ></view>
        <Image class="g_z--2 g_w-full" src="@/static/index_login_bot.png"/>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Image from '@/components/resource/Image.vue'

defineProps({
  /** 启动logo */
  bootLogo: {
    type: String,
    default: ''
  },
  /** 欢迎语 */
  welcome: {
    type: String,
    default: '270835426@qq.com'
  }
})
</script>

<style lang="scss">
image {
  width: 100%;
  height: 100%;
}
</style>
