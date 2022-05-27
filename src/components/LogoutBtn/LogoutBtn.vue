<template>
  <large-button class="logou-btn" color="" @click="logout">退出登录</large-button>
</template>

<script lang="ts" setup>
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import { Dialog } from 'vant'
import { Interceptor } from './types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { logoutApi } from '@/api/wallet'
import { UserInfo } from '@/store/storeTypes'

const router = useRouter()
const store =  useStore()
const { walletId, openId }: UserInfo = store.state.userInfo

const logout = () => {
  Dialog.confirm({
    width: '351px',
    className: 'wallet-dialog',
    message: '确定要退出登录吗？',
    beforeClose
  })
  .then(result => {
    // 清空
    store.dispatch('resetUserInfo')
    store.dispatch('resetWalletList')
    result && router.replace('/login')
  })
  .catch(reason => {
    console.log(reason)
  })
}
const beforeClose:Interceptor = (action) =>
  new Promise((resolve) => {
    if (action === 'confirm') {
      handleLogout().then(() => resolve(true), () => resolve(false))
    } else {
      // 拦截取消操作
      resolve(true);
    }
  });

const handleLogout = async () => {
  let data = {
    walletId,
    openId
  }
  try {
    await logoutApi(data)
    return true
  } catch (e) {
    throw Error(e as string)
  }
}

</script>

<style lang="scss" scoped>
.logou-btn {
  font-weight: 400;
  font-size: 32px;
  color: $font-color-3;
  border: none;
  height: 100px;
}
</style>
<style lang="scss">
.wallet-dialog {
  border-radius: 20px;
  .van-dialog__content--isolated {
    min-height: 155px;
  }
  .van-button--default {
    @include themify {
      color: themed('primaryColor');
    }
  }
  .van-dialog__confirm,
  .van-dialog__cancel {
    height: 112px;
    font-size: 32px;
    font-weight: 400;
  }
  .van-dialog__confirm {
    font-weight: 500;
  }
  .van-dialog__message {
    font-weight: 400;
    font-size: 32px;
    color: $font-color-1;
  }
}
</style>