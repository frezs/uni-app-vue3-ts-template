<template>
  <view class="relative g_mb-24rpx g_mx-30rpx g_p-10rpx g_overflow-hidden"
        :class="'g_tab-' + style">
    <scroll-view
      class="relative w-full g_text-30rpx g_overflow-scroll g_whitespace-nowrap"
      :show-scrollbar="false"
      enable-flex
      scroll-x
    >
      <view class="relative flex-row g_justify-between g_center g_text-30rpx"
            :class="Number(style) > 0 ? 'g_p-10rpx' : ''"
      >
        <view
          v-for="(name, i) in (!names.length ? _names : names)"
          :class="(current == i ? _class[style][1] : _class[style][0])"
          @click="() => (enableAll || clickable[i]) && (current = i)"
          class="relative g_min-w-50rxp g_px-25rpx g_h-62rpx g_leading-62rpx g_text-center g_rounded-62rpx"
        >
          {{ name }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ref, watch, computed } from 'vue'
import { number } from 'echarts'

const _class = [
  ['', 'g_tab-active', ''],
  ['', 'g_color-p line space'],
  ['', 'g_color-p line space']
]

const _names = ref(['案件信息', '物品信息', '签字确认'])
const emits = defineEmits(['change'])
const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  names: {
    type: Array<string>,
    default: []
  },
  /**
   * 样式类型 0,1,2
   */
  style: {
    type: [Number, String],
    default: 0
  },
  clickable: {
    type: Array<Number>,
    default: [1, 1, 1]
  },
  enableAll: {
    type: Boolean,
    default: false
  }
})

const current = ref(props.value)

watch(
  () => current.value,
  () => {
    emits('change', current.value)
  }
)
watch(
  () => props.value,
  () => {
    current.value = props.value
  }
)

onMounted(() => {
  current.value = props.value
})
</script>

<style lang="scss" scoped>
.g_tab-active {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  transition: all 0.1s;
}

.g_tab-1 {
  .relative:nth-child(n+2) {
    //border-radius: 0 !important;
    //border-left: 1px solid #C3E0D9;
    &::after {
      content: '';
      position: absolute;
      width: 2rpx;
      height: 36rpx;
      background: #C3E0D9;
      left: 0;
      top: 25%;
    }
  }
}

.g_tab-2 {
  .g_min-w-50rxp {
    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 16rpx;
    width: 90%;
    height: 3rpx;
    background-color: #ccc;
    left: 50%;
    transform: translate(-50%, 0%)
  }

  .relative:nth-child(n+2) {
    //border-radius: 0 !important;
    //border-left: 1px solid #C3E0D9;
    &::after {
      content: '';
      position: absolute;
      width: 2rpx;
      height: 36rpx;
      background: #fff;
      left: 0;
      top: 25%;
    }
  }
}

.g_color-p.line {
  &::before {
    content: ' ';
    position: absolute;
    width: 52rpx;
    height: 6rpx;
    background: #017A5E;
    left: 50%;
    bottom: -5rpx;
    transform: translate(-50%, 0);
  }
}
</style>
