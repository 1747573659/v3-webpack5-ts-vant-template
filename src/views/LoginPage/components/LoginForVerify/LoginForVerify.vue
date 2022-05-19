<template>
  <msg-verify :error-msg="errorMsg" @handleVerifyCode="handleVerifyCode" @resend="resend"></msg-verify>
  <overlay-loading :show="showOverlay" content="登录中..."></overlay-loading>
</template>

<script lang="ts" setup>
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
import MsgVerify from '@/components/MsgVerify/MsgVerify.vue'
import { ref } from 'vue';
import { VerifyCode } from '@/components/MsgVerify/types';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { loginPhoneCode, LoginGetCode } from '@/api/wallet'
import { UserInfo } from '@/store/storeTypes';
import useCheckNeedVerify from '@/hooks/useCheckNeedVerify'
import { LoginReq } from '@/api/types';

const props = defineProps<{
  loginData: LoginReq
}>()

const errorMsg = ref('')

const showOverlay = ref(false)
const router = useRouter()

// 拿到vuex中存储的loginName
const store = useStore()
const { loginName, loginItemType, openId, shopAdminId }: UserInfo = store.state.userInfo

const resetVerifyFunc = ref()
// 登录得重新发送接口
async function handleResend() {
  errorMsg.value = ''
  console.log(props.loginData)
  try {
    const res = await LoginGetCode(props.loginData)
    // 如果返回失败就显示失败原因
    // 如果成功就进入读秒
    if (typeof res === 'string') {
      console.log(res)
      errorMsg.value = res
    } else {
      resetVerifyFunc.value()
    }
  } catch (error) {
  } finally {
  }
}
// 校验五次的拦截器
const loginResend = useCheckNeedVerify(handleResend)
// 处理重新发送的逻辑
const resend = async (resetVerify: () => void) => {
  // 将重置逻辑保存起来
  resetVerifyFunc.value = resetVerify
  console.log('resend')
  try {
    await loginResend()
  } catch(e) {}
}
// 处理发送验证码
const handleVerifyCode = async (verifyCode: VerifyCode) => {
  showOverlay.value = true
  console.log(verifyCode)
  let data = {
    code: verifyCode,
    openId: openId,
    phone: loginName,
    shopAdminId: shopAdminId
  }
  try {
    const res = await loginPhoneCode(data)
    if (typeof res === 'string') {
      console.log(res)
      errorMsg.value = res
    }
    store.dispatch('setUserInfo', {
      token: res.token
    })
    // 如果使用钱包登录则直接replace path: myWallet
    if (loginItemType === 1) {
      router.replace('/myWallet')
    } else {
      store.dispatch('setWalletList', res.walletList)
      showOverlay.value = false
      router.replace('/walletList')
    }
  } catch (e) {
    
  } finally {
    showOverlay.value = false
  }
}

</script>

<style lang="scss" scoped></style>