<template>
  <view class="flex flex-col flex-1" :class="loading ? '' : 'g_center'">
    <template v-if="loading">
      <SkeletonCard class="g_w-690rpx"></SkeletonCard>
      <SkeletonCard class="g_w-690rpx"></SkeletonCard>
      <SkeletonCard class="g_w-690rpx"></SkeletonCard>
    </template>
    <template v-else-if="!card">
      <Image class="g_mt-60rpx g_w-443rpx" src="@/static/icon_com_empty.png"></Image>
      <view class="g_my-60rpx g_text-28 g_color-#aaa">{{ text }}</view>
    </template>
    <template v-else>
      <Image class="g_w-475rpx" src="@/static/icon_in-out_01.png"></Image>
    </template>
  </view>
</template>

<script lang="ts" setup>
import Image from '@/components/resource/Image.vue'
import SkeletonCard from '@/components/public/SkeletonCard.vue'

defineProps({
  card: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '暂无数据'
  }
})
</script>

<style>
image {
  width: 100%;
  height: 100%;
}
</style>
