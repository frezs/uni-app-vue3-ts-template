<template>
  <view class="relative g_w-100vw g_h-88rpx g_box-border" style="margin-top: var(--sys-bar-height)">
    <view class="flex flex-row flex-1 g_justify-between g_px-30rpx ">
      <view class="g_text-32rpx g_leading-88rpx g_text-#fff">{{ title }}</view>
      <view class="g_py-22rpx g_z-0" @click="() => router.navigateTo('index.me')">
        <Image class="g_w-40rpx" src="@/static/icon_com_user.png"></Image>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import router from '@/router'
import Image from '@/components/resource/Image.vue'
import { computed } from 'vue'

const _barHeight = computed(() => statusBarHeight + _height.value)
defineProps({
  title: {
    type: String,
    default: '...'
  }
})

</script>

<style lang="scss"></style>
