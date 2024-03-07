<template>
  <Page>
    <BootBg></BootBg>
  </Page>
  <view class="flex">
    <view> Hello uni-app</view>
    <view class="g_text-48rpx g_font-bold">This is index!</view>
  </view>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted } from 'vue'

const application = useAppStore()

onLoad((query: any) => application.init(query))
onMounted(() => application.bootstrap())

</script>

<style>
</style>
