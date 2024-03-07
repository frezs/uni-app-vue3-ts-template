<template>
  <Page>
    <CustomBg class="fixed"/>
    <view class="relative relative" :style="style.join(';')">
      <view id="slot-top" class=" relative g_w-100vw g_top-0 g_z-99 g_overflow-hidden">
        <slot name="top"></slot>
      </view>
      <scroll-view
        class="g_w-100vw g_overflow-scroll "
        style="height: calc(100vh - var(--nav-bar) - var(--tab-bar)"
        :show-scrollbar="false"
        enable-flex
        scroll-y
        :refresher-enabled="refresherEnabled"
        refresher-background="transparent"
        :refresher-triggered="triggered"
        :refresher-threshold="100"
        @refresherrefresh="onRefresh"
        @refresherpulling="onPulling"
        @refresherrestore="onRestore"
        @refresherabort="onAbort"
        @scrolltolower="() => emits('bottom')"
      >
        <slot></slot>
        <view v-if="!bottom" class="g_pb-40rpx"></view>
      </scroll-view>
      <view id="slot-bottom" class="g_fixed g_w-100vw g_bottom-0">
        <template v-if="bottom">
          <slot name="bottom"></slot>
        </template>
      </view>
    </view>
  </Page>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { getRectList } from '@/utils/sys'
import Page from '@/components/resource/Page.vue'
import CustomBg from '@/components/background/CustomBg.vue'
import { onUnload } from '@dcloudio/uni-app'
import { PAGE_EVENT } from '@/config/constant'

const emits = defineEmits(['bottom', 'top', 'refresh'])
const style = ref<string[]>([''])
const triggered = ref<string | boolean>(false)
const _refreshing = ref<string | boolean>(false)

const props = defineProps({
  /**
   * 默认不显示
   */
  bottom: {
    type: Boolean,
    default: false
  },
  bgColor: {
    type: String,
    default: ''
  },
  refresherEnabled: {
    type: Boolean,
    default: false
  },
  refreshTimes: {
    type: [Number, String],
    default: '1000'
  }
})


function onRefresh() {
  console.log('onRefresh')
  if (_refreshing.value) return
  _refreshing.value = true
  setTimeout(() => {
    triggered.value = false
    _refreshing.value = false
    emits('refresh')
    console.log('onRefresh emits')
  }, Number(props.refreshTimes))
}

function onPulling(e) {
  console.log('onPulling', e)
  if (e.detail.deltaY < 0) return  // 防止上滑页面也触发下拉
  triggered.value = true
}

function onRestore() {
  triggered.value = 'restore' // 需要重置
  console.log('onRestore')
}

function onAbort() {
  console.log('onAbort')
}

const app = getCurrentInstance()

function init() {
  const proxy = app?.proxy ?? null
  const sysBarHeight = uni.getSystemInfoSync().statusBarHeight
  proxy && getRectList(proxy, ['#slot-top', '#slot-bottom']).then((res) => {
    const [nav, footer] = res.map(e => e.height) || []
    style.value = [`--nav-bar:${nav}px`, `--tab-bar:${footer}px`, `--sys-bar-height:${sysBarHeight}px`]
  })
}

onMounted(() => {
  uni.$on(PAGE_EVENT.CustomPageInit, init)
})

onUnload(() => Object.keys(PAGE_EVENT).forEach(k => uni.$off(k)))

</script>

<style>
.uni-scroll-view-refresh__spinner > circle {
  color: #017a5e !important;
}

.uni-scroll-view-refresh-inner svg {
  fill: #017a5e !important;
  color: #017a5e !important;
}

</style>