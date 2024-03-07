<template>
  <view class="relative flex flex-row flex-wrap">
    <template v-for="(item, index) in list" :key="index">
      <view
        class="g_ml-30rpx g_mt-30rpx g_bg-#fff g_w-300 g_h-116 g_rounded-20rpx"
        :class="index > list?.length - 2 ? 'g_mb-30rpx' : ''"
        @click="(...arg) => onclick(arg, item)"
      >
        <view class="g_flex-l g_p-30rpx">
          <Image class="g_w-56rpx g_h-56rpx" :src="item.icon"/>
          <tm-text class="g_ml-30rpx" :font-size="28" :label="item.text"></tm-text>
        </view>
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
import Image from '@/components/resource/Image.vue'
import router from '@/router'
import { useScanStore } from '@/store/modules/scan'

const emits = defineEmits(['event'])
defineProps(['list'])

function onclick(arg: any, item: any) {
  if (item.event) {
    if (item.event == 'scan') {
      useScanStore().scan().then(val => emits('event', [item.event, val]))
      return
    }
    emits('event', [item.event, arg])
    return
  }
  item.key && router.navigateTo(item.key)
}

</script>

<style scoped>
</style>