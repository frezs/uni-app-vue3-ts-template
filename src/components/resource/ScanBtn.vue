<template>
  <Image class="g_w-40rpx"
         :src="primary ? icons.primary : icons.white"
         @click="() => useScanStore().scan(validate).then(val => emits('scan', val))"
  ></Image>
</template>
<script lang="ts" setup>
import router from '@/router'
import Image from './Image.vue'
import { useScanStore } from '@/store/modules/scan'
import { PropType } from 'vue'

const icons = {
  primary: '@/static/icon_com_scan_primary.png',
  white: '@/static/icon_com_scan_white.png'
}

const emits = defineEmits(['scan', 'ret'])

const props = defineProps({
  /**
   * icon url
   */
  icon: {
    type: String,
    default: '@/static/icon_com_scan_primary.png'
  },
  /**
   * icon大小 值只能为 64 56 48 40 32 24 16
   */
  width: {
    type: String,
    default: '40'
  },
  primary: {
    type: Boolean,
    default: false
  },
  validate: {
    type: Object as PropType<(t: any) => Promise<any>>,
    default: undefined
  }
})

</script>
