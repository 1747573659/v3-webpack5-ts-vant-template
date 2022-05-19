<template>
  <van-popup v-model:show="showInner" position="bottom" :style="{ height: '100%' }" closeable >
    <div class="title">短信验证</div>
    <div class="operation-type">提现</div>
    <div class="amout">¥{{moneyForShow}}</div>
    <msg-verify ref="msgVerifyComp" @handleVerifyCode="handleVerifyCode" :error-msg="errorMsg"></msg-verify>
  </van-popup>
</template>

<script lang="ts" setup>
import { computed, toRefs, ref } from 'vue'

import MsgVerify from '@/components/MsgVerify/MsgVerify.vue'
import { VerifyCode } from '@/components/MsgVerify/types';
import { Money } from '../../types';
import { formatYuanAmount } from '@/utils/formateMoney'

const props = defineProps<{
  show: boolean,
  errorMsg: string,
  money: Money
}>()
const { show, errorMsg, money } = toRefs(props)

const moneyForShow = computed(() => formatYuanAmount(money.value))


const emits = defineEmits<{
  (e: 'update:show', show:boolean): void,
  (e: 'handleVerifyCode', verifyCode: VerifyCode): void
}>()

const msgVerifyComp = ref()
const showInner = computed({
  get: () => {
    msgVerifyComp.value && msgVerifyComp.value.passwordInputFocus()
    return show.value
  },
  set: (value) => {
    emits('update:show', value)
  }
})

const handleVerifyCode = (verifyCode: VerifyCode) => {
  emits('handleVerifyCode', verifyCode)
}


</script>

<style lang="scss" scoped>
.title {
  height: 48px;
  line-height: 48px;
  padding: 36px 24px 79px;
  text-align: center;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  color: $font-color-1;
}
.operation-type {
  text-align: center;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 160%;
  color: $font-color-3;
}
.amout {
  padding: 40px 0 142px;
  text-align: center;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 100%;
  color: $font-color-1;
}
</style>