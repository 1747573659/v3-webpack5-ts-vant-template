<template>
  <van-tabs v-model:active="loginType" color="#31353C" class="tabs" @change="change">
    <van-tab v-for="item in loginNameTypeList" :key="item.title" :title="item.title"/>
  </van-tabs>
  <Field
    v-if="[0].includes(loginType)"
    class="login"
    :class="{'active-border': loginNameShowBorder, error: !!errorMsg}"
    @focus="loginNameFocus"
    @blur="loginNameBlur"
    :placeholder="placeholder"
    :clearable="true"
    v-model="loginName"
  />
  <Field
    v-if="[1, 2].includes(loginType)"
    readonly
    clickable
    @touchstart.stop="loginNameShowBorder = true"
    class="login"
    :class="{'active-border': loginNameShowBorder, error: !!errorMsg}"
    @focus="loginNameFocus"
    @blur="loginNameBlur"
    :placeholder="placeholder"
    :clearable="true"
    v-model="loginName"
  />
  <div class="error-msg" v-if="errorMsg"><img class="warn-icon" :src="warnIcon" alt="警告">{{errorMsg}}</div>
  <van-number-keyboard
    v-if="[1, 2].includes(loginType)"
    v-model="loginName"
    :extra-key="extraKey"
    :show="loginNameShowBorder"
    :maxlength="6"
    @blur="loginNameShowBorder = false"
  />
</template>

<script setup lang="ts">
import warn from '@/assets/icons/warn.png';
import { Field } from 'vant'
import { ref, toRefs, computed } from '@vue/reactivity'

import { LoginName } from '@/store/storeTypes'

const props = defineProps<{
  errorMsg: string,
  modelValue: LoginName
}>()
const { errorMsg, modelValue } = toRefs(props)
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: LoginName): void
}>()

const loginName = computed<LoginName>({
  get: () => modelValue.value,
  set: (value:LoginName) => {
    emits('update:modelValue', value)
  }
})

const loginNameTypeList = [
  {
    title: '钱包ID',
    placeHolder: '请输入钱包ID',
    extraKey: ''
  },
  {
    title: '手机号',
    placeHolder: '请输入手机号',
    extraKey: ''
  },
  {
    title: '法人身份证',
    placeHolder: '请输入法人身份证',
    extraKey: 'X'
  }
]
const loginType = ref(0)
const placeholder = computed(() => loginNameTypeList[loginType.value].placeHolder)
const extraKey = computed(() => loginNameTypeList[loginType.value].extraKey)
const change = () => {
  console.log(loginType.value)
  loginName.value = ''
}

const loginNameShowBorder = ref<boolean>(false)
const loginNameFocus = () => {
  loginNameShowBorder.value = true
}
const loginNameBlur = () => {
  loginNameShowBorder.value = false
}

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
.tabs {
  width: 600px;
  height: 126px;
  &:deep(.van-tabs__wrap) {
    height: 92px;
    .van-tab {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      line-height: 50px;
      color: $font-color-2;
    }
    .van-tab--active {
      color: $font-color-1;
    }
    .van-tabs__line {
      width: 48px;
    }
  }
}
</style>