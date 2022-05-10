<template>
  <div class="phone-mention">
    验证码将发送至<span class="phone-mention-num">{{getLoginNameForDisplay}}</span>
  </div>
  <password-input
    class="password-input"
    gutter="13px"
    :value="verifyCode"
    :mask="false"
    :focused="showKeyboard"
    @focus="passwordInputFocus"
  />
  <resend-verify-code class="password-resend" @resend="resend"></resend-verify-code>
  <number-keyboard
    v-model="verifyCode"
    :show="showKeyboard"
    @blur="showKeyboard = false"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { PasswordInput, NumberKeyboard } from 'vant'
import { VerifyCode, CountDown } from './types'
import { useStore } from 'vuex'
import ResendVerifyCode from './ResendVerifyCode.vue'

// 拿到vuex中存储的loginName
const { loginName } = useStore().state.userInfo

// 将loginName格式化显示
const getLoginNameForDisplay = computed(() => {
  let arr = loginName.split('')
  arr.splice(3, 0, ' ');
  arr.splice(8, 0, ' ');
  return arr.join("");
})

// 验证码
const verifyCode = ref<VerifyCode>(undefined)
// 是否展示键盘
const showKeyboard = ref(true)
// 当选中输入框时调起键盘并且清空输入框
const passwordInputFocus = () => {
  showKeyboard.value = true
  verifyCode.value = undefined
}

// 定义emit事件
const emit = defineEmits<{
  (e: 'handleVerifyCode', verifyCode:VerifyCode): void
}>()

// 验证码输入完毕直接调用发送验证码
watch(verifyCode, () => {
  if(verifyCode.value && verifyCode.value.length === 6) {
    showKeyboard.value = false
    handleVerifyCode()
  }
})
// 验证验证码
const handleVerifyCode = () => {
  emit('handleVerifyCode', verifyCode.value)
}

// 重新发送
const resend = (countDown: CountDown) => {
  // 重置定时器
  countDown.reset()
  countDown.start()
  // 清空并聚焦
  passwordInputFocus()
  console.log('resend')
}
</script>

<style scoped lang="scss">
.phone-mention {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  color: $font-color-3;
  padding-left: 40px;
  text-align: left;
  &-num {
    color: $font-color-1;
    margin-left: 10px;
  }
}
.password-input {
  margin: 106px 42px 0;
  &:deep(.van-password-input__item) {
    border-bottom: solid 1px $borderColor;
    color: $font-color-1;
    font-size: 50px;
  }
  &:deep(.van-password-input__item--focus) {
    border-bottom: solid 1px $primaryColor;
  }
  &:deep(.van-password-input__cursor) {
    background: $primaryColor;
  }
}
.password-resend {
  margin: 30px 42px 0;
}
</style>