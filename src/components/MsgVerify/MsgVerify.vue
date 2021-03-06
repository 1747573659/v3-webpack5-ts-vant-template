<template>
  <div>
    <div class="phone-mention">
      验证码将发送至<span class="phone-mention-num">{{getLoginNameForDisplay}}</span>
    </div>
    <password-input
      @click="passwordInputFocus"
      class="password-input"
      :value="verifyCode"
      :mask="false"
      @focus="passwordInputFocus"
      :focused="passwordFocus"
      type="tel"
    />
    <div class="password-input-footer">
      <resend-verify-code class="password-resend" :showResend="showResend" @resend="resend"></resend-verify-code>
      <div class="error-msg" v-if="errorMsg"><img class="warn-icon" :src="warnIcon" alt="警告"><div>{{errorMsg}}</div></div>
    </div>
    <van-field
      :autofocus="true"
      style="opacity: 0;"
      ref="hiddenField"
      autocomplete="one-time-code"
      @blur="hiddenFieldBlur"
      type="tel"
      v-model="verifyCode"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, toRefs } from 'vue';
import { PasswordInput } from 'vant'
import { VerifyCode, CountDown } from './types'
import { useStore } from 'vuex'
import ResendVerifyCode from './ResendVerifyCode.vue'
import warn from '@/assets/icons/warn.png';
const warnIcon = ref(warn)

const hiddenField = ref()

// onMounted(() => {
//   // console.log(hiddenField.value.focus)
//   passwordInputFocus()
// })

const props = defineProps<{
  errorMsg: string
}>()
const { errorMsg } = toRefs(props)

const showResend = computed(() => errorMsg.value !== '验证码输入错误次数已达上限，您的账号将会被锁定24小时')

const passwordFocus = ref(true)

const hiddenFieldBlur = () => {
  passwordFocus.value = false
}

// 拿到vuex中存储的loginName
const { loginName } = useStore().state.userInfo

// 将loginName格式化显示
const getLoginNameForDisplay = computed(() => {
  let arr = loginName.split('')
  arr.splice(3, 4, ...['*','*','*','*']);
  arr.splice(3, 0, ' ');
  arr.splice(8, 0, ' ');
  return arr.join("");
})

// 验证码
const verifyCode = ref<VerifyCode>('')
// 是否展示键盘
// 当选中输入框时调起键盘并且清空输入框
const passwordInputFocus = () => {
  passwordFocus.value = true
  hiddenField.value.focus()
  verifyCode.value = ''
}
// 将方法抛出  否则无法父组件无法通过ref调用
defineExpose({
  passwordInputFocus
})

// 定义emit事件
const emit = defineEmits<{
  (e: 'handleVerifyCode', verifyCode:VerifyCode): void
  (e: 'resend', resetVerify: () => void): void
}>()

// 验证码输入完毕直接调用发送验证码
watch(verifyCode, () => {
  if(verifyCode.value && verifyCode.value.length === 6) {
    handleVerifyCode()
  }
})
// 验证验证码
const handleVerifyCode = () => {
  hiddenField.value.blur()
  emit('handleVerifyCode', verifyCode.value)
}

// 重新发送
const resend = (countDown: CountDown) => {
  function resetVerify() {
    // 重置定时器
    countDown.reset()
    countDown.start()
    // 清空并聚焦
    passwordInputFocus()
  }
  // 由于有多种请求验证码的情况，所以在这里吧resend方法给emit出去
  emit('resend', resetVerify)
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
    font-weight: 500;
    color: $font-color-1;
    margin-left: 10px;
  }
}
.password-input {
  margin: 106px 42px 0;
  &:deep(.van-hairline--left) {
    margin-left: 13px;
  }
  &:deep(.van-password-input__security) {
    &::after {
      content: none;
    }
  }
  &:deep(.van-password-input__item) {
    border-bottom: solid 2px $borderColor;
    color: $font-color-1;
    font-size: 50px;
    width: 100px;
    flex: none;
    &::after {
      content: none;
    }
  }
  &:deep(.van-password-input__item--focus) {
    @include themify {
      border-bottom: solid 2px themed('primaryColor');
    }
  }
  &:deep(.van-password-input__cursor) {
    width: 4px;
    height: 50px;

    @include themify {
      background: themed('primaryColor');
    }
  }
}
.password-input-footer {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  line-height: 58px;
  margin-top: 30px;
}
.password-resend {
  // margin: 30px 42px 0;
  line-height: 58px;
  margin: 0 42px;
}
.error-msg {
  padding-left: 40px;
  font-size: 32px;
  color: $errorColor;
  display: flex;
  align-items: center;
  height: 58px;
  div {
    padding-left: 8px;
  }
}
.warn-icon {
  width: 40px;
  height: 40px;
}
</style>