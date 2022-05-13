<template>
  <large-button class="logou-btn" color="" @click="logout">退出登录</large-button>
</template>

<script lang="ts" setup>
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import { Dialog } from 'vant'
import { Interceptor } from './types'

const logout = () => {
  Dialog.confirm({
    width: '351px',
    confirmButtonColor: '#00A3FF',
    cancelButtonColor: '#00A3FF',
    className: 'wallet-dialog',
    message: '确定要退出登录吗？',
    beforeClose
  })
  .then(result => {
    console.log(result)
  })
  .catch(reason => {
    console.log(reason)
  })
}
const beforeClose:Interceptor = (action) =>
  new Promise((resolve) => {
    if (action === 'confirm') {
      resolve(true);
    } else {
      // 拦截取消操作
      resolve(true);
    }
  });

</script>

<style lang="scss" scoped>
.logou-btn {
  font-weight: 400;
  font-size: 32px;
  color: $font-color-3;
}
</style>
<style lang="scss">
.wallet-dialog {
  border-radius: 20px;
  .van-dialog__content--isolated {
    min-height: 155px;
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