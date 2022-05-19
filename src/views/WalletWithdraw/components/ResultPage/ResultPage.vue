<template>
  <van-popup v-model:show="show" position="right" :style="{ height: '100%', width: '100%' }" >
    <div class="content">
      <template v-if="errorMsg">
        <img class="png" :src="withdrawSucessPng" alt="withdrawSucess">
        <div class="title">提现成功</div>
      </template>
      <template v-else>
        <img class="png" :src="withdrawErrorPng" alt="withdrawError">
        <div class="title">提现失败</div>
        <div class="desc">{{errorMsg}}</div>
      </template>
      <div class="money">-{{moneyForShow}}</div>
    </div>
    <back-btn @click="emits('update:show', false)"></back-btn>
  </van-popup>
</template>

<script lang="ts" setup>
import withdrawSucess from '@/assets/icons/withdrawSucess.png'
import withdrawError from '@/assets/icons/withdrawError.png'
import { toRefs, ref, computed } from 'vue';
import BackBtn from '@/components/BackBtn/BackBtn.vue'
import { Money } from '../../types';
import { formatYuanAmount } from '@/utils/formateMoney';

const withdrawSucessPng = ref(withdrawSucess)
const withdrawErrorPng = ref(withdrawError)

const props = defineProps<{
  show: boolean,
  money: Money,
  errorMsg: string
}>()
const emits = defineEmits<{
  (e: 'update:show', show:boolean): void
}>()
const { show, money } = toRefs(props)

const moneyForShow = computed(() => formatYuanAmount(money.value))

</script>

<style lang="scss" scoped>
.content {
  padding-top: 160px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .png {
    width: 132px;
    height: 132px;
  }
  .title {
    margin-top: 24px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    color: $font-color-1;
  }
  .desc {
    margin-top: 24px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 48px;
    color: $font-color-2;
  }
  .money {
    margin-top: 40px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 70px;
    color: $font-color-1;
  }
}
</style>