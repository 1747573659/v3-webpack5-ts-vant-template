<template>
  <div class="wallet-card">
    <div class="wallet-card-content">
      <div class="wallet-card-content-title">
        可用余额（元）
      </div>
      <div class="wallet-card-content-money">
        <div class="wallet-card-content-money-text">330,568.50</div>
        <div class="wallet-card-content-money-withdraw">
          <van-button size="small" type="primary" @click="gotoWithdraw">提现</van-button>
        </div>
      </div>
      <div class="wallet-card-content-detail">
        <div>张三</div>
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
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

const arrowRightSSvg = ref(arrowRightS)

const router = useRouter()
const gotoWithdraw = () => {
  router.push('/walletWithdraw')
}

const gotoDetail = () => {
  router.push('/merchantInfo')
}

</script>

<style lang="scss" scoped>
.wallet-card {
  height: 388px;
  background: linear-gradient(180deg, #00a3ff 0%, rgba(0, 163, 255, .5) 67.19%, rgba(0, 163, 255, 0) 100%);
  overflow: hidden;
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
        color: $primaryColor;
      }
      &-withdraw {
        &:deep(.van-button) {
          width: 180px;
          height: 66px;
          background: $primaryColor;
          border-radius: 10px;
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
        .icon {
          display: inline-block;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>