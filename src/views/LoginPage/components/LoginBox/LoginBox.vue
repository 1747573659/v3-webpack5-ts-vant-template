<template>
  <Field
    class="login"
    :class="{'active-border': loginNameShowBorder, error: !!errorMsg}"
    @focus="loginNameFocus"
    @blur="loginNameBlur"
    placeholder="手机号码/钱包ID/法人身份证号"
    :clearable="true"
    v-bind="$attrs"
  />
  <div class="error-msg" v-if="errorMsg"><img class="warn-icon" :src="warnIcon" alt="警告">{{errorMsg}}</div>
</template>

<script setup lang="ts">
import warn from '@/assets/icons/warn.png';
import { Field } from 'vant'
import { ref, toRefs } from '@vue/reactivity'

const loginNameShowBorder = ref<boolean>(false)
const loginNameFocus = () => {
  loginNameShowBorder.value = true
}
const loginNameBlur = () => {
  loginNameShowBorder.value = false
}

const props = defineProps<{
  errorMsg: string
}>()

const { errorMsg } = toRefs(props)

const warnIcon = ref(warn)

</script>

<style lang="scss" scoped>
.login {
  padding: 0 40px;
  &:deep(.van-field__control) {
    font-size: 50px;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
    font-size: 32px;
  }
  &:deep(.van-field__body) {
    border-bottom: solid 1px $borderColor;
    height: 111px;
  }
}
.error {
  &:deep(.van-field__control) {
    color: $errorColor;
  }
}
.active-border {
  &:deep(.van-field__body) {
    border-bottom: solid 1px $primaryColor;
  }
}
.error-msg {
  text-align: left;
  margin-top: 20px;
  padding-left: 40px;
  font-size: 32px;
  color: $errorColor;
}
.warn-icon {
  width: 40px;
  height: 40px;
}
</style>