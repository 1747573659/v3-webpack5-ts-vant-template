<!--
 * @Date         : 2022-05-12 11:22:45
 * @LastEditors  : 庄鸿斌
 * @LastEditTime : 2022-05-16 18:43:19
-->
<template>
  <div class="wallet-info">
    <div class="shop-logo-wrap">
      <img
        :src="shopImg"
        alt="商家图片"
        class="shop-logo"
      />
    </div>
    <div class="shop-info">
      <div class="shop-info-name">{{walletDetailInfo.shortShopName}}</div>
      <div class="shop-info-walletID">{{walletDetailInfo.walletId}}</div>
    </div>
    <copy-btn :text="copyText"></copy-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from '@vue/reactivity'
import shopImgDefault from '@/assets/img/shopImgDefault.png'
import { walletDetailRep } from '@/api/types'
import CopyBtn from '@/components/CopyBtn/CopyBtn.vue'

const props = defineProps<{
  walletDetailInfo: walletDetailRep
}>()
const { walletDetailInfo } = toRefs<{
  walletDetailInfo: walletDetailRep
}>(props)

const shopImg = ref(shopImgDefault)
const copyText = ref('copyText')
</script>

<style lang="scss" scoped>
.wallet-info {
  height: 120px;
  background-color: $primaryColor;
  padding: 24px 48px;
  display: flex;
  align-items: center;
  .shop-logo-wrap {
    width: 120px;
    height: 120px;
    border-radius: 32px;
    border: 3px solid $white;
    .shop-logo {
      width: 120px;
      height: 120px;
    }
  }
  .shop-info {
    margin-left: 32px;
    font-family: 'PingFang SC';
    font-style: normal;
    color: $white;
    flex: 1;
    &-name {
      font-weight: 500;
      font-size: 36px;
    }
    &-walletID {
      margin-top: 8px;
      font-weight: 400;
      font-size: 28px;
    }
  }
}
</style>