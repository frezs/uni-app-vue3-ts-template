<template>
  <view class="g_pb-20rpx">
    <tm-spin v-if="loading" :load="loading" :tip="loadText"></tm-spin>
    <tm-divider v-else class="g_px-30rpx" transprent :label="moreText"></tm-divider>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  loadText: {
    type: String,
    default: '数据加载中...'
  },
  moreText: {
    type: String,
    default: '没有更多了'
  }
})

</script>