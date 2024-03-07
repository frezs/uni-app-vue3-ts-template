<template>
  <view class="g_text-36rpx">
    <div class="progress-circle" :style="style">
      <slot>
        <view class="content"></view>
      </slot>
      <svg>
        <defs v-if="isGradient">
          <linearGradient id="gradient">
            <stop v-for="_, i in gradient" :offset="`${ 100 / (gradient.length - 1) * i }%`"
                  :stop-color="gradient[i]"></stop>
          </linearGradient>
        </defs>
        <circle stroke="var(--none)"/>
        <circle :stroke="isGradient ? 'url(#gradient)' : 'var(--color)'"
                class="progress-value"
                style="stroke-dasharray: calc(2 * 3.1415 * var(--r) * (var(--percent) / 100)), 1000"
        />
      </svg>
    </div>
  </view>
</template>

<script lang="ts" setup>

import { computed } from 'vue'

export interface ProgressRingProps {
  ratio?: string | number
  label?: string
  width?: number
  none?: string
  color?: string
  gradient?: string[]
}

const props = withDefaults(defineProps<ProgressRingProps>(), {
  width: 30,
  none: '#E1E1E1',
  color: 'red',
  gradient: () => ['#E6B67C', '#F1D379']
})

const isGradient = computed(() => Array.isArray(props.gradient) && props.gradient.length >= 2)
const style = computed(() => (
  {
    '--percent': props.ratio, /* 百分数 */
    '--size': '100%', /* 尺寸大小 */
    '--border-width': props.width / 2 + '%', /* 环宽（粗细） */
    '--color': props.color,  /* 主色 */
    '--none': props.none  /* 辅助色 */
  }
))
</script>

<style lang="scss" scoped>

.progress-circle {
  --percent: 0; /* 百分数 */
  --size: 180rpx; /* 尺寸大小 */
  --border-width: 30rpx; /* 环宽（粗细） */
  --color: #7856d7; /* 主色 */
  --none: #ccc; /* 辅助色 */

  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  /* 百分数文本 */
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--size);
    height: var(--size);

    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      counter-reset: progress var(--percent);
      content: counter(progress) '%';
      white-space: nowrap;
    }
  }

  /* SVG 容器 */
  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  /* 进度条圆环 */
  circle {
    --r: calc((var(--size) - var(--border-width)) / 2);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--r);
    fill: none;
    stroke-width: var(--border-width);
    stroke-linecap: round;
    transition: stroke-dasharray .4s linear, stroke .3s;
  }

  /* 优化：进度为0时隐藏进度条 */
  .progress-value {
    opacity: var(--percent);
  }
}

</style>