<template>
  <view
    class="info-card-gap relative flex flex-col g_bg-white g_rounded-15rpx g_p-30rpx g_text-#333 g_overflow-hidden"
  >
    <!-- 背景 -->
    <view class="relative info-card-mask">
      <view class="bg"></view>
    </view>
    <view class="flex-row g_justify-between g_center g_mb-22rpx g_z-1">
      <view class="flex-row g_center">
        <Image class="g_mr-15rpx g_w-28rpx" :src="info.icon"></Image>
        <view class="g_text-30rpx g_leading-30rpx">{{ info.title }}</view>
      </view>
      <view class="g_text-24rpx g_leading-24rpx g_text-#aaa">
        {{ info.date }}
      </view>
    </view>
    <view class="relative flex-1 flex w-full flex-col g_center g_mx-30rpx">
      <view class="flex flex-col g_center g_my-24rpx">
        <text class="g_text-32rpx g_font-bold">{{ info.boxName }}</text>
        <text class="g_mt-20rpx">{{ info.boxSerial }}</text>
      </view>
      <Divider class="g_w-610rpx g_h-2rpx" />
      <view class="flex flex-col g_center g_mt-36rpx">
        <text class="text_4">{{ info.name }}</text>
        <Image v-if="info.qrUrl" class="g_w-220rpx g_h-220rpx g_my-26rpx" :src="info.qrUrl" />
        <view v-else class="g_w-220rpx g_h-220rpx g_my-26rpx">
          <tm-qrcode
            ref="qrcode"
            :option="{
              size: 220,
              str: info.qrStr,
            }"
          ></tm-qrcode>
        </view>
        <text>
          {{ `${info.boxPrefix} ${info.boxCur}${info.boxSpace}${info.boxLen}` }}
        </text>
      </view>
      <tm-checkbox class="absolute g_top-60% g_left-0" @change="onChange" label=""></tm-checkbox>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { BoxQRInfoProps } from '.'
import Divider from './Divider.vue'
import Image from './Image.vue'
import { ref } from 'vue'

const emits = defineEmits(['change'])
const qrcode = ref(null)
const info = ref<BoxQRInfoProps & { checked?: boolean }>({})

const _info = {
  icon: '/static/logo.png',
  title: '蚌埠烟草专卖',
  date: '2023-10-30',
  name: '张三',
  boxName: '暂存箱',
  boxSerial: '3210120202110132',
  boxPrefix: '封箱号',
  boxCur: '1',
  boxLen: '2',
  boxSpace: '/',
  qrUrl: '',
  qrStr: '',
}

const props = defineProps({
  selectable: {
    type: Boolean,
    default: true,
  },
  process: {
    type: Function,
    default: () => undefined,
  },
})

onMounted(() => {
  props.process && (info.value = props.process(_info)) // 将默认值传给父组件进行处理
  console.log(info.value)
})

const onChange = (agr: boolean) => {
  info.value.selected = agr
  emits('change', agr)
}
</script>

<style lang="scss" scoped>
/**
在实现边界分明的渐变时，后面颜色的位置只需要小于等于前面颜色的位置就行了，比如0
透明颜色可以用16进制缩写比如**#0000来代替，不透明的部分随便用一个颜色就好，我喜欢用red**，主要是这个单词比较短
还有渐变的位置默认是居中的，所以第二个center可以去除，left 可以用0来表示

作者：阅文前端团队
链接：https://juejin.cn/post/6945023989555134494
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
.info-card-gap {
  -webkit-mask: radial-gradient(circle at 0 36%, #0000 20px, red 0),
    radial-gradient(circle at right 36%, #0000 20px, red 0);
  -webkit-mask-size: 51%; /*避免出现缝隙*/
  -webkit-mask-position: 0, 100%; /*一个居左一个居右*/
  -webkit-mask-repeat: no-repeat;
}

.info-card-mask {
  .bg {
    position: absolute;
    width: 690rpx;
    height: 80rpx;
    left: -30rpx;
    top: -30rpx;
    background: linear-gradient(to bottom, #deede6, transparent);
  }
}
</style>
