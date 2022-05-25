<template>
  <div class="wallet-card">
    <div class="wallet-card-content">
      <div class="wallet-card-content-title">
        <span>可用余额（元）</span>
        <img class="icon eye-icon" @click="showAmount = !showAmount" :src="eyePng" alt="eyePng">
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
import eye from '@/assets/icons/eye.png'
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
const eyePng = ref(eye)

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
      margin: 0 24px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-text {
        font-weight: 500;
        font-size: 48px;

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