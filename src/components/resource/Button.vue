<template>
  <view class="g-button relative flex g_center" hover-class="g_opacity-70"
        :class="[classMap[type], classMap[`${disabled}`]]">
    <button class="g_bg-#0000 flex flex-row g_center" hover-class="g_bg-#0000">
      <slot></slot>
    </button>
  </view>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const classMap = {
  primary: 'g_btn g_btn-primary',
  plain: 'g_btn g_btn-plain',
  grey: 'g_btn g_btn-grey',
  normal: 'g_btn g_btn-normal',
  danger: 'g_btn g_btn-danger-p',
  warn: 'g_btn g_btn-warn-p',
  true: 'g_opacity-70',
  false: ''
}

defineProps({
  type: {
    type: String as PropType<'primary' | 'plain' | 'grey' | 'normal' | 'warn' | 'danger'>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
button {
  padding: 0;
}

button:after {
  content: none;
}

button::after {
  border: none;
}

button::before {
  border: none;
}

.g-button + .g-button,
.g_btn + .g_btn {
  margin-left: 30rpx;
}

.g_btn-m + .g_btn-m {
  margin-left: 20rpx;
}

.g_btn-sm + .g_btn-sm {
  margin-left: 15rpx;
}

.g_btn-ss + .g_btn-ss {
  margin-left: 10rpx;
}

.g_btn-s + .g_btn-s {
  margin-left: 8rpx;
}

.g_btn-plain view {
  color: #017A5E;
}

</style>
