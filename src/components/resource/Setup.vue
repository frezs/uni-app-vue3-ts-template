<template>
  <view
    class="relative flex flex-1 flex-row g_px-48rpx g_pt46rpx g_pb-36rpx g_center g_justify-between g_rounded-15rpx g_bg-white"
  >
    <view class="relative" v-for="(title, i) in namesValue">
      <view class="relative" :class="['', 'active'][activeVal[i]]">
        <view class="absolute setup-dot"></view>
        <view v-if="i < 2" class="absolute setup-line"></view>
        <view class="g_mt-35rpx g_tex-30rpx g_text-#bbb setup-text">{{ title }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import { watch } from 'vue'

const props = defineProps({
  active: {
    type: Array<number>,
    default: [0, 0, 0]
  },
  names: {
    type: Array<string>,
    default: []
  },
  types: {
    type: Array<number>,
    default: []
  }
})

const activeVal = ref(props.active)
const namesValue = ref(props.names)

onMounted(() => {
  activeVal.value = props.active
  if (props.types?.length) refreshNames()
})

function refreshNames() {
  namesValue.value = props.types.map(t => MEMBER_TYPE[t])
}

function refreshActive() {
  props.active?.forEach((e, i) => activeVal.value[i] = e)
}

watch(() => props.active, () => refreshActive())
watch(() => props.types, () => refreshNames())


</script>

<style lang="scss" scoped>
.setup-dot {
  width: 32rpx;
  height: 32rpx;
  background: linear-gradient(0deg, #cccccc, #eeeeee);
  border-radius: 50%;
  left: 50%;
  top: -60%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.setup-line {
  width: 180rpx;
  height: 4rpx;
  left: 180%;
  top: -60%;
  transform: translate(-50%, -50%);
  background: linear-gradient(0deg, #cccccc, #eeeeee);
  z-index: 0;
}

.active {
  .setup-dot {
    background: linear-gradient(180deg, #65c789, #38aa62);
  }

  .setup-line {
    background: linear-gradient(180deg, #65c789, #38aa62);
  }

  .setup-text {
    color: #38AA62;
  }
}
</style>
