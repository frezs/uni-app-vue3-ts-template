<template>
  <view class="flex flex-row g_mx-30rpx g_my-20rpx g_z-0">
    <view v-if="!hiddenScan" class="flex flex-col g_center g_mr-30rpx">
      <ScanBtn @scan="(val) => emits('scan', val)"></ScanBtn>
      <view class="g_text-16rpx g_text-white">扫一扫</view>
    </view>
    <view transprent class="flex-1" :margin="[0]" :padding="[0]">
      <tm-input
        :placeholder="placeholder"
        :errorLabel="errorLabel"
        show-clear
        :font-size="28"
        color="primary"
        :searchLabel="searchLabel"
        prefix="tmicon-search"
        @clear="(...args) => emits('clear', ...args)"
        @search="(...args) => emits('search', ...args)"
      ></tm-input>
    </view>
    <view class="flex g_self-center g_mx-24rpx g_text-28rpx g_text-white"
          v-if="!hiddenExit"
          @click="() => emits('exit')">取消
    </view>
  </view>
</template>

<script lang="ts" setup>
import ScanBtn from '../resource/ScanBtn.vue'

const emits = defineEmits(['search', 'clear', 'exit', 'scan'])
const props = defineProps({
  /** 隐藏logo */
  hiddenScan: {
    type: Boolean,
    default: false
  },
  /** 隐藏取消 */
  hiddenExit: {
    type: Boolean,
    default: true
  },
  searchLabel: {
    type: String,
    default: '搜索'
  },
  placeholder: {
    type: String,
    default: '请输入查询关键字'
  },
  //错误时，提示的文本。
  errorLabel: {
    type: String,
    default: '请输入查询关键字'
  }
})
</script>

<style>
image {
  width: 100%;
  height: 100%;
}
</style>
