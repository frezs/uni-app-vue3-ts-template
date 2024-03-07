<template>
  <view class="relative g_mb-24rpx g_mx-30rpx">
    <view
      class="relative flex g_center g_justify-between g_p-10rpx g_text-30rpx "
      :class="'g_tab-' + style"
    >
      <view
        v-for="(name, i) in (!names.length ? _names : names)"
        :class="(current == i ? _class[style][1] : _class[style][0])"
        @click="() => (enableAll || clickable[i]) && (current = i)"
        class="relative g_h-62rpx g_leading-62rpx g_text-center g_rounded-62rpx"
        :style="{ width: 690 / names.length + 'rpx' }"
      >
        {{ name }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ref, watch, computed } from 'vue'

const _class = [
  ['', 'g_tab-active'],
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
    type: Number,
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

.g_color-p.line {
  &::before {
    content: ' ';
    position: absolute;
    width: 52rpx;
    height: 6rpx;
    background: #017A5E;
    left: 50%;
    bottom: -4rpx;
    transform: translate(-50%, 0);
  }
}
</style>
