<template>
  <view class="g_text-28rpx">
    <view
      class="relative g_w-full g_h-30rpx g_rounded-30rpx g_mb-24rpx g_overflow-hidden g_bg-#eee">
      <view
        class="absolute g_h-100% g_left-0 g_border-rd-15px g_transition-all g_transition-duration-0.1s g_bg-gradient-linear"
        :style="{ width: ratio + '%', background: `linear-gradient(90deg, #E6B67C, #F1D379)` }"
      ></view>
    </view>
    <view class="flex flex-row g_justify-between g_mb-10rpx">
      <view class="g_text-#666">{{ label }}</view>
      <view class="g_font-bold g_text-#333">{{ `${ratio}%` }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>

export interface ProgressLineProps {
  ratio?: string | number
  label?: string,
  gradient?: string[]
}

withDefaults(defineProps<ProgressLineProps>(), {
  gradient: () => ['#E6B67C', '#F1D379']
})

</script>