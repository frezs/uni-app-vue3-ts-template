<template>
  <Page ref="app">
    <view class="g_m-0 g_p-0 w-full flex-1 flex justify-center items-center">
      <LoginBg>
        <view class="g_m-0 g_py-40rpx g_p-x0">
          <LoginForm @confirm="() => router.goHome()"></LoginForm>
        </view>
      </LoginBg>
    </view>
  </Page>
</template>

<script lang="ts" setup>
import router from '@/router'
</script>

<style></style>
