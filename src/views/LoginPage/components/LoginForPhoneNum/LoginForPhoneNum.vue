<template>
  <div class="login-name">
    <login-box v-model="loginName" @loginItemTypeChange="loginItemTypeChange" :errorMsg="errorMsg"></login-box>
  </div>
  <div class="login-btn">
    <large-button type="primary" loading-text="获取短信验证码" :loading="loginBtnLoading" :disabled="loginBtnDisabled" @click="handleLogin" size="large">获取短信验证码</large-button>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed, onMounted } from 'vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import LoginBox from '../../components/LoginBox/LoginBox.vue'
import { useStore } from 'vuex'

import { LoginGetCode } from '@/api/wallet'

onMounted(() => {
  store.dispatch('setUserInfo', {
    openId: 'XSDFFG346TJHTRJ78O7OZDG'
  })
})

const loginName = ref('')
// 1：钱包ID 2：法人手机号 3：法人身份证
const loginItemType = ref(1)
const loginItemTypeChange = (type: number) => {
  loginItemType.value = ++type
  errorMsg.value = ''
}

const errorMsg = ref('')

const loginBtnDisabled = computed(() => !loginName.value.length || !!errorMsg.value)

const loginBtnLoading = ref(false)

const emit = defineEmits<{
  (e: 'loginSucess', flag: boolean): void
}>()

const store = useStore()

// 登录事件
const handleLogin = async () => {
  loginBtnLoading.value = true
  let data = {
    loginItemType: loginItemType.value,
    loginItem: loginName.value,
    shopAdminId: 70,
    openId: 'XSDFFG346TJHTRJ78O7OZDG'
  }
  try {
    const res = await LoginGetCode(data)
    // 如果返回失败
    if (typeof res === 'string') {
      errorMsg.value = res
    } else {
      store.dispatch('setUserInfo', {
        loginName: res.phone,
        loginItemType: res.loginItemType,
        shopAdminId: res.shopAdminId,
        walletId: loginItemType.value === 1 ? loginName.value : ''
      })
      emit('loginSucess', true)
    }
  } catch (error) {
  } finally {
    loginBtnLoading.value = false
  }
}

// 清空错误信息
watch(loginName, (newValue:string, oldValue:string) => {
  if (newValue !== oldValue) {
    errorMsg.value = ''
  }
})

</script>

<style lang="scss" scoped>
.login-btn {
  margin-top: 176px;
  padding: 0 32px;
}
</style>
