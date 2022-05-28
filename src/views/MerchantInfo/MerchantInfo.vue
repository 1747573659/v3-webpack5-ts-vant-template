<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'

  import useWalletDetail from '@/hooks/useWalletDetail'

  const { walletDetailInfo, loading } = useWalletDetail()

  const router = useRouter()
  const merchantEnum = [
    {
      title: '基本信息',
      children: [
        {
          key: 'shortShopName',
          label: '商户简称'
        },
        {
          key: 'walletId',
          label: '钱包ID'
        }
      ]
    },
    {
      title: '公司资料',
      children: [
        {
          key: 'shopName',
          label: '公司名称'
        },
        {
          key: 'businessLicense',
          label: '营业执照号',
          hidden(info: { merchantType: number }) {
            return info.merchantType === 3
          }
        },
        {
          key: 'legalName',
          label: '法人姓名'
        },
        {
          key: 'legalNumber',
          label: '法人身份证'
        },
        {
          key: 'legalPhone',
          label: '法人手机号'
        }
      ]
    },
    {
      title: '提现账户',
      children: [
        {
          key: 'accountName',
          label: '账户名称'
        },
        {
          key: 'bankCard',
          label: '银行卡号'
        },
        {
          key: 'openBank',
          label: '开户行'
        }
      ]
    }
  ]
  const handleToTechPolicy = () => {
    router.push('/kmTechPolicy')
  }
</script>

<template>
  <div class="merchantInfo-wrap">
    <div class="merchantInfo-main">
      <div class="merchantInfo-card" v-for="(item, index) in merchantEnum" :key="index">
        <div class="merchantInfo-title">{{ item.title }}</div>
        <template v-for="childItem in item.children" :key="childItem.key">
          <div
            class="merchantInfo-item"
            v-if="!childItem.hidden || (childItem.hidden && !childItem.hidden(walletDetailInfo))">
            <div class="merchantInfo-item-inner">
              <div class="left">{{ childItem.label }}</div>
              <div class="right">{{ walletDetailInfo[childItem.key] }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="merchantInfo-policy" v-btnStats>
      <span @click="handleToTechPolicy">《科脉技术隐私政策》</span>
    </div>
  </div>
  <overlay-loading :show="loading" content="加载中..."></overlay-loading>
</template>
<style lang="scss" scoped>
.merchantInfo {
  &-wrap {
    text-align: left;
    background-color: #fff;
    padding-bottom: 160px;
  }
  &-title {
    padding: 0 24px;
    font-size: 28px;
    color: $font-color-2;
    height: 86px;
    line-height: 86px;
    background-color: $bg-light-color-1;
  }
}
.merchantInfo-item {
  padding: 0 24px;
}
.merchantInfo-item-inner {
  display: flex;
  justify-content: space-between;

  // align-items: center;
  padding: 30px 0;
  font-size: 32px;
  background-color: #fff;
  border-bottom: 1px solid $border-split-color-1;
  .left {
    flex: 0 0 300px;
    line-height: 44px;
    color: $font-color-3;
  }
  .right {
    line-height: 44px;
    word-break: break-all;
    color: $font-color-1;
    text-align: right;
  }
}
.merchantInfo-policy {
  text-align: center;
  height: 110px;
  line-height: 110px;
  background-color: $bg-light-color-1;
  font-weight: 400;
  font-size: 28px;
  span {
    line-height: 39px;
  }

  @include themify {
    color: themed('primaryColor');
  }
}
.merchantInfo-back {
  padding: 24px 32px;
  background-color: #fff;
  .van-button {
    width: 100%;
    border-radius: 10px;
    background-color: $bg-light-color-1;
  }
}
</style>
