<template>
  <van-popup @closed="closed" v-model:show="show" position="right" :style="{ height: '100%', width: '100%' }" >
    <div class="query" v-if="status === 1">
      <van-loading/>
      <span class="loading-text">提现中...</span>
    </div>
    <div class="result" v-if="[2, 3, 4].includes(status)">
      <div class="content">
        <template v-if="status === 2">
          <img class="png" :src="withdrawSucessPng" alt="withdrawSucess">
          <div class="title">提现成功</div>
        </template>
        <template v-if="status === 3">
          <img class="png" :src="withdrawErrorPng" alt="withdrawError">
          <div class="title">提现失败</div>
          <div class="desc">{{errorMsg}}</div>
        </template>
        <template v-if="status === 4">
          <img class="png" :src="withdrawLoadingPng" alt="withdrawLoading">
          <div class="title">提现中</div>
          <div class="desc">银行暂未返回提现结果，请稍后查看</div>
        </template>
        <div class="money">-{{moneyForShow}}</div>
      </div>
      <back-btn @click="emits('update:show', false)">完成</back-btn>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import withdrawSucess from '@/assets/icons/withdrawSucess.png'
import withdrawError from '@/assets/icons/withdrawError.png'
import withdrawLoading from '@/assets/icons/withdrawLoading.png'
import { toRefs, ref, computed } from 'vue';
import BackBtn from '@/components/BackBtn/BackBtn.vue'
import { Money } from '../../types';
import { formatYuanAmount } from '@/utils/formateMoney';

const withdrawSucessPng = ref(withdrawSucess)
const withdrawErrorPng = ref(withdrawError)
const withdrawLoadingPng = ref(withdrawLoading)

const props = defineProps<{
  show: boolean,
  money: Money,
  errorMsg: string,
  status: number // 1query 2sucess 3error 4loading
}>()
const emits = defineEmits<{
  (e: 'update:show', show:boolean): void
  (e: 'closed'): void
}>()
const { show, money, status, errorMsg } = toRefs(props)

const closed = () => {
  emits('closed')
}

const moneyForShow = computed(() => formatYuanAmount(money.value))

</script>

<style lang="scss" scoped>
.query {
  padding-top: 514px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:deep(.van-loading__spinner) {
    width: 98px;
    height: 98px;

    @include themify {
      color: themed('primaryColor');
    }
  }
  .loading-text {
    margin-top: 40px;
    font-weight: 400;
    font-size: 36px;
    line-height: 32px;
    color: $font-color-3;
  }
}
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
    line-height: 48px;
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