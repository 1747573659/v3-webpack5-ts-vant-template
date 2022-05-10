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
  <number-keyboard
    v-model="verifyCode"
    :show="showKeyboard"
    @blur="showKeyboard = false"
  />
  <overlay-loading :show="showOverlay" content="登录中..."></overlay-loading>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { PasswordInput, NumberKeyboard } from 'vant'
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'

type VerifyCode = undefined | string

const loginName = ref('13147157402')
const getLoginNameForDisplay = computed(() => {
  let arr = loginName.value.split('')
  arr.splice(3, 0, ' ');
  arr.splice(8, 0, ' ');
  return arr.join("");
})

const verifyCode = ref<VerifyCode>(undefined)
const showKeyboard = ref(true)

const passwordInputFocus = () => {
  showKeyboard.value = true
  verifyCode.value = undefined
}

const showOverlay = ref(false)

// 输入完毕直接调用发送验证码
watch(verifyCode, () => {
  if(verifyCode.value && verifyCode.value.length === 6) {
    showKeyboard.value = false
    handleVerifyCode()
  }
})
// 发送验证码
const handleVerifyCode = () => {
  showOverlay.value = true
  setTimeout(() => {
    console.log('验证成功')
    showOverlay.value = false
  }, 1000);
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
  margin-top: 106px;
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
</style>