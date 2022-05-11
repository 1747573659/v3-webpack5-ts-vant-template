<template>
  <div class="resend-verifycode">
    <div class="countdown-text" v-if="current.seconds">{{ current.seconds }}秒后可重新发送</div>
    <div class="resend-text" @click="showResendConfirm = true" v-else>重新发送</div>
    <resend-confirm :show="showResendConfirm" @sucess="confirmSucess"></resend-confirm> 
  </div>
</template>

<script lang="ts" setup>
import { useCountDown } from '@vant/use';
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { CountDown } from './types'
import ResendConfirm from './ResendConfirm.vue'

// 倒计时逻辑
const countDown = useCountDown({
  // 倒计时 60s
  time: 6 * 1000,
});
onMounted(() => {
  countDown.start()
})
onBeforeUnmount(() => {
  countDown.pause()
})
const current = countDown.current

const showResendConfirm = ref(false)

// 定义emit事件
const emit = defineEmits<{
  (e: 'resend', countDown: CountDown): void
}>()

const confirmSucess = () => {
  showResendConfirm.value = false
  emit('resend', countDown)
}

</script>

<style lang="scss" scoped>
.resend-verifycode {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  text-align: right;
  .countdown-text {
    color: $font-color-2;
  }
  .resend-text {
    color: $font-color-1;
  }
}
</style>