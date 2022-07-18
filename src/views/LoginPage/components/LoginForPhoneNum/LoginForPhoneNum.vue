<template>
  <div class="login-name">
    <login-box v-model="loginName" @loginItemTypeChange="loginItemTypeChange" :errorMsg="errorMsg"></login-box>
  </div>
  <div class="login-btn">
    <large-button type="primary" v-btnStats loading-text="获取短信验证码" :loading="loginBtnLoading" :disabled="loginBtnDisabled" @click="login" size="large">获取短信验证码</large-button>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import LoginBox from '../../components/LoginBox/LoginBox.vue'
import { useStore } from 'vuex'
import { LoginGetCode } from '@/api/wallet'

import useCheckNeedVerify from '@/hooks/useCheckNeedVerify'
import { LoginReq } from '@/api/types'

const loginName = ref('')
const loginItemType = ref(1)
const loginItemTypeChange = (type: number) => {
  loginItemType.value = ++type
  errorMsg.value = ''
}

const errorMsg = ref('')

const loginBtnDisabled = computed(() => !loginName.value.length)

const loginBtnLoading = ref(false)

const emit = defineEmits<{
  (e: 'loginSucess', data: LoginReq): void
}>()

const store = useStore()

const login = () => {
  loginBtnLoading.value = true
  checkNeedVerify().catch(() => {
    loginBtnLoading.value = false
  })
}

// 登录事件
const handleLogin = async () => {
  let data = {
    loginItemType: loginItemType.value,
    loginItem: loginName.value.replace(/ /g, ''),
    shopAdminId: store.state.userInfo.shopAdminId,
    openId: store.state.userInfo.openId
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
      emit('loginSucess', data)
    }
  } catch (error) {
  } finally {
    loginBtnLoading.value = false
  }
}

const checkNeedVerify = useCheckNeedVerify(handleLogin, loginName)

// 清空错误信息
watch(loginName, (newValue:string, oldValue:string) => {
  if (newValue !== oldValue) {
    errorMsg.value = ''
  }
})

</script>

<style lang="scss" scoped>
.login-btn {
  margin-top: 114px;
  padding: 0 32px;
  &:deep(.van-button--primary) {
    @include themify {
      background-color: themed('primaryColor');
      border-color: themed('primaryColor');
    }
  }
}
</style>
