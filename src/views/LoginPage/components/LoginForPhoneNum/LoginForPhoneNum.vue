<template>
  <div class="login-name">
    <login-box v-model="loginName" :errorMsg="errorMsg"></login-box>
  </div>
  <div class="login-btn">
    <large-button type="primary" loading-text="获取短信验证码" :loading="loginBtnLoading" :disabled="loginBtnDisabled" @click="handleLogin" size="large">获取短信验证码</large-button>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import LoginBox from '../../components/LoginBox/LoginBox.vue'
// import { onMounted } from '@vue/runtime-core'
// import { useStore } from 'vuex'

// import { Login } from '@/api/wallet'

// onMounted(() => {})

const loginName = ref('')

const errorMsg = ref('')

const loginBtnDisabled = computed(() => !loginName.value.length || !!errorMsg.value)

const loginBtnLoading = ref(false)

const emit = defineEmits<{
  (e: 'loginSucess', flag: boolean): void
}>()

// 登录事件
const handleLogin = () => {
  loginBtnLoading.value = true
  setTimeout(() => {
    loginBtnLoading.value = false
  }, 1000);
  console.log('login')
  console.log(loginName.value)
  errorMsg.value = '该号码尚未注册，请核实后重新输入'
  emit('loginSucess', true)
}

// 清空错误信息
watch(loginName, (newValue:string, oldValue:string) => {
  if (newValue !== oldValue) {
    errorMsg.value = ''
  }
})
</script>

<style lang="scss" scoped>
.login-name {
  margin-top: 84px;
  height: 111px;
}
.login-btn {
  margin-top: 176px;
  padding: 0 32px;
}
</style>
