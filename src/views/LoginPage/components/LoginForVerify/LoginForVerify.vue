<template>
  <msg-verify @handleVerifyCode="handleVerifyCode"></msg-verify>
  <overlay-loading :show="showOverlay" content="登录中..."></overlay-loading>
</template>

<script lang="ts" setup>
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
import MsgVerify from '@/components/MsgVerify/MsgVerify.vue'
import { ref } from 'vue';
import { VerifyCode } from '@/components/MsgVerify/types';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { loginPhoneCode } from '@/api/wallet'
import { UserInfo } from '@/store/storeTypes';

const showOverlay = ref(false)
const router = useRouter()

// 拿到vuex中存储的loginName
const store = useStore()
const { loginName, loginItemType }: UserInfo = store.state.userInfo

// 处理发送验证码
const handleVerifyCode = async (verifyCode: VerifyCode) => {
  showOverlay.value = true
  console.log(verifyCode)
  let data = {
    code: verifyCode,
    openId: 'XSDFFG346TJHTRJ78O7OZDG',
    phone: loginName,
    shopAdminId: 70
  }
  try {
    const res = await loginPhoneCode(data)
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