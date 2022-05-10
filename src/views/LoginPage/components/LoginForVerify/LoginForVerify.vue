<template>
  <msg-verify @handleVerifyCode="handleVerifyCode"></msg-verify>
  <overlay-loading :show="showOverlay" content="登录中..."></overlay-loading>
</template>

<script lang="ts" setup>
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
import MsgVerify from '@/components/MsgVerify/MsgVerify.vue'
import { ref } from 'vue';
import { VerifyCode } from '@/components/MsgVerify/types';

const showOverlay = ref(false)

// 处理发送验证码
const handleVerifyCode = (verifyCode: VerifyCode) => {
  showOverlay.value = true
  console.log(verifyCode)
  setTimeout(() => {
    showOverlay.value = false
  }, 1000);
}

</script>

<style lang="scss" scoped></style>