<template>
  <view class="flex flex-col center">
    <tm-input
      show-clear
      v-model.lazy="user.userAcc"
      placeholder="请输入用户名"
      errorLabel="重新输入"
      prefix="tmicon-user-fill"
    ></tm-input>
    <tm-input
      password
      show-clear
      v-model.lazy="user.userPassword"
      :margin="[0, 50, 0, 40]"
      placeholder="请输入密码"
      errorLabel="重新输入"
      prefix="tmicon-lock-fill"
    ></tm-input>
    <tm-checkbox
      label="记住密码"
      v-model.lazy="remembered"
      @change="onCheckbox"
      :disabled="!(user.userAcc && user.userPassword)"
    ></tm-checkbox>
    <tm-button
      block
      label="登录"
      color="primary"
      @click="onLogin"
      :margin="[0, 40]"
      :disabled="!(user.userAcc && user.userPassword)"
    ></tm-button>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { reactive, ref, onMounted } from 'vue'

const emits = defineEmits(['confirm'])
const userStore = useUserStore()
const remembered = ref(false)
const user = reactive({
  userAcc: '',
  userPassword: ''
})

const onCheckbox = (val: boolean) => userStore.remembered(val)

const validate = () => {
}

async function onLogin() {
  validate()
  console.log('===========onLogin', user)
  try {
    await userStore.login(user)
    emits('confirm')
  } catch {
  }
}

onMounted(() => {
  remembered.value = userStore.setting?.remembered || false
  user.userAcc = userStore.account?.userAcc
  user.userPassword = userStore.account?.userPassword
})
</script>

<style></style>
