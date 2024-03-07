<template>
  <Image :class="`g_w-${width}rpx`" :src="icons[name] ? icons[name] : url ">
    <text
      class="g_w-64rpx g_w-56rpx g_w-48rpx g_w-40rpx g_w-32rpx g_w-24rpx g_w-16rpx g_hidden"
    ></text>
  </Image>
</template>

<script lang="ts" setup>

import Image from './Image.vue'
import { PropType } from 'vue'


const icons = {
  'search-grey': '',
  'search-primary': ''
}

type Icons = keyof typeof icons
type Width = '64' | '56' | '48' | '40' | '32' | '28' | '24' | '16'

defineProps({
  /**
   * 值只能为  其他请自行使用class设置
   */
  width: {
    type: Object as PropType<Width>,
    default: '40'
  },
  url: {
    type: String,
    default: '@/static/logo.png'
  },
  name: {
    type: Object as PropType<Icons>,
    default: ''
  }
})
</script>
