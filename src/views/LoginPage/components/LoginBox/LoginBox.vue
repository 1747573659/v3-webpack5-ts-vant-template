<template>
  <div class="login-box">
    <van-tabs v-model:active="loginItemType" color="#31353C" class="tabs" @change="loginItemTypeChange">
      <van-tab v-for="item in loginItemTypeList" :key="item.title" :title="item.title"/>
    </van-tabs>
    <Field
      v-if="[0, 1].includes(loginItemType)"
      class="login"
      :class="{'active-border': loginNameShowBorder, error: !!errorMsg}"
      @focus="loginNameFocus"
      :type="loginItemType ? 'tel' : 'text'"
      @blur="loginNameBlur"
      :placeholder="placeholder"
      :maxlength="loginItemType ? '13' : '25'"
      :clearable="true"
      v-model.trim="loginName"
      @update:model-value="loginNameUpdate"
    />
    <Field
      v-if="[2].includes(loginItemType)"
      readonly
      clickable
      @touchstart.stop="loginNameShowBorder = true"
      class="login"
      :class="{'active-border': loginNameShowBorder, error: !!errorMsg}"
      @focus="loginNameFocus"
      @blur="loginNameBlur"
      :placeholder="placeholder"
      :clearable="true"
      v-model.trim="loginName"
      :formatter="idNumberUpdate"
    />
    <div class="error-msg" v-if="errorMsg"><img class="warn-icon" :src="warnIcon" alt="警告"><div>{{errorMsg}}</div></div>
    <van-number-keyboard
      v-if="[2].includes(loginItemType)"
      v-model="loginName"
      extra-key="x"
      :show="loginNameShowBorder"
      @blur="loginNameShowBorder = false"
    />
  </div>
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
  (e: 'loginItemTypeChange', loginItemType: number): void
}>()

const loginName = computed<LoginName>({
  get: () => modelValue.value,
  set: (value:LoginName) => {
    emits('update:modelValue', value)
  }
})

const loginNameUpdate = (mobile:string) => {
  if (loginItemType.value === 1) {
    let value = mobile.replace(/\D/g, '').substring(0, 11);
    let valueLen = value.length;
    if (valueLen > 3 && valueLen < 8) {
          value = `${value.substr(0, 3)} ${value.substr(3)}`;
    } else if (valueLen >= 8) {
          value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
    }
    loginName.value = value
  }
}

const idNumberUpdate = (oldValue: string) => {
  let newValue = oldValue.replace(/[^a-z0-9A-Z]/g, '').substring(0, 18)
  let valueLen = newValue.length
  if (valueLen > 3 && valueLen < 7) {
    newValue = newValue.replace(/^(...)/g, '$1 ')
  } else if (valueLen >= 7 && valueLen < 11) {
    newValue = newValue.replace(/^(...)(...)/g, '$1 $2 ')
  } else if (valueLen >= 11 && valueLen < 15) {
    newValue = newValue.replace(/^(...)(...)(....)/g, '$1 $2 $3 ')
  } else {
    newValue = newValue.replace(/^(...)(...)(....)(....)/g, '$1 $2 $3 $4 ')
  }
  return newValue
}

const loginItemTypeList = [
  {
    title: '钱包ID',
    placeHolder: '请输入钱包ID',
  },
  {
    title: '手机号',
    placeHolder: '请输入手机号',
  },
  {
    title: '法人身份证',
    placeHolder: '请输入法人身份证',
  }
]
const loginItemType = ref(0)
const placeholder = computed(() => loginItemTypeList[loginItemType.value].placeHolder)
const loginItemTypeChange = () => {
  loginName.value = ''
  emits('loginItemTypeChange', loginItemType.value)
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
.login-box {
  position: relative;
}
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
    @include themify {
      border-bottom: solid 1px themed('primaryColor');
    }
  }
}
.error-msg {
  position: absolute;
  margin-top: 24px;
  padding-left: 40px;
  font-size: 32px;
  color: $errorColor;
  display: flex;
  align-items: center;
  height: 45px;
  div {
    padding-left: 8px;
  }
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