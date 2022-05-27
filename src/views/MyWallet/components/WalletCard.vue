<template>
  <div class="wallet-card">
    <div class="wallet-card-content">
      <div class="wallet-card-content-title">
        <span>可用余额（元）</span>
        <svg class="icon eye-icon" v-if="showAmount" @click="showAmount = !showAmount" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 20C7.00272 14.2043 12.9622 10 20 10C27.0394 10 32.9973 14.2043 35 20C32.9973 25.7957 27.0394 30 20 30C12.9622 30 7.00272 25.7957 5 20Z" stroke="#64676D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="20" cy="20" r="4.5" stroke="#64676D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="icon eye-icon" v-if="!showAmount" @click="showAmount = !showAmount" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15C7.00272 20.7957 12.9622 25 20 25C27.0394 25 32.9973 20.7957 35 15" stroke="#64676D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <rect width="2.45788" height="5.69139" rx="1.22894" transform="matrix(0.880865 0.473368 -0.527112 0.849796 6.83594 18.6562)" fill="#64676D"/>
          <rect width="2.45788" height="5.69139" rx="1.22894" transform="matrix(-0.880865 0.473368 0.527112 0.849796 33.166 18.6562)" fill="#64676D"/>
          <rect width="2.48887" height="5.61636" rx="1.24443" transform="matrix(0.970247 0.242117 -0.276498 0.961014 14.5859 23.6624)" fill="#64676D"/>
          <rect width="2.48887" height="5.61636" rx="1.24443" transform="matrix(-0.970247 0.242117 0.276498 0.961014 25.416 23.6624)" fill="#64676D"/>
        </svg>
      </div>
      <div class="wallet-card-content-money">
        <div class="wallet-card-content-money-text">{{ availableAmount }}</div>
        <div class="wallet-card-content-money-withdraw">
          <van-button size="small" type="primary" @click="gotoWithdraw">提现</van-button>
        </div>
      </div>
      <div class="wallet-card-content-detail">
        <div>{{ walletDetailInfo.accountName }}</div>
        <div class="wallet-card-content-detail-right" @click="gotoDetail">
          <span>详情</span>
          <img class="icon" :src="arrowRightSSvg" alt="arrowRightSSvg">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import arrowRightS from '@/assets/icons/arrowRightS.svg'
import { ref, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { walletDetailRep } from '@/api/types'
import { formatYuanAmount } from '@/utils/formateMoney'
import { computed } from 'vue'

const props = defineProps<{
  walletDetailInfo: walletDetailRep
}>()
const { walletDetailInfo } = toRefs<{
  walletDetailInfo: walletDetailRep
}>(props)

const showAmount = ref(false)

const availableAmount = computed(() => showAmount.value ? formatYuanAmount(String(walletDetailInfo.value.availableAmount)) : '***')

const arrowRightSSvg = ref(arrowRightS)

const router = useRouter()
const gotoWithdraw = () => {
  router.push('/walletWithdraw')
}

const gotoDetail = () => {
  router.push({path: '/merchantInfo'})
}

</script>

<style lang="scss" scoped>
.wallet-card {
  height: 388px;
  overflow: hidden;

  @include themify {
    background: themed('walletCardColor');
  }
  &-content {
    margin: 22px 24px 44px;
    background-color: $white;
    height: 322px;
    border-radius: 20px;
    overflow: hidden;
    &-title {
      font-weight: 500;
      font-size: 26px;
      color: $font-color-1;
      line-height: 40px;
      margin: 30px 24px 12px;
      display: flex;
      align-items: center;
    }
    &-money {
      height: 136px;
      padding: 0 24px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      &-text {
        font-weight: 500;
        font-size: 52px;

        @include themify {
          color: themed('primaryColor');
        }
      }
      &-withdraw {
        &:deep(.van-button) {
          width: 180px;
          height: 66px;
          border-radius: 10px;
          border: none;
          font-weight: 500;
          font-size: 26px;
          line-height: 36px;

          @include themify {
            background-color: themed('primaryColor');
          }
        }
      }
    }
    &-detail {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 24px;
      font-weight: 500;
      font-size: 26px;
      color: $font-color-3;
      &-right {
        font-weight: 400;
        line-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .eye-icon {
    margin-left: 16px;
  }
}
</style>