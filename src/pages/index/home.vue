<template>
  <CustomPage class="fixed">
    <template #top>
      <HomeNavbar></HomeNavbar>
    </template>
    <!-- 轮播 -->
    <Carousel
      class="w-full"
      :round="3"
      :margin="[0]"
      :width="690"
      :height="240"
      :list="carouselList"
      autoplay
      model="rect"
    ></Carousel>
    <view class="g_text-48rpx g_font-bold" >This is Home!</view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { useScanStore } from '@/store/modules/scan'

const carouselList = []
const eventMap = {
  'scan': () => useScanStore().sanToEvent()
}

</script>

<style scoped>
</style>