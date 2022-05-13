<template>
  <van-cell-group>
    <van-cell class="cell" label="商户简称" is-link @click="cellClick">
      <template #title>
        <div class="walletId">钱包ID</div>
      </template>
      <template #label>
        <span class="shortName">商户简称</span>
      </template>
      <template #value>
        <div class="walletId">QB265213213521</div>
        <span class="shortName">过长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的话就换行</span>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const cellClick = () => {
  router.push('/myWallet')
}
</script>

<style lang="scss" scoped>
.cell {
  &:deep(.van-cell__title) {
    width: 160px;
    flex: none;
  }
  &:deep(.van-cell__value) {
    text-align: left;
  }
}
.walletId {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  color: $font-color-1;
}
.shortName {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: $font-color-2;
}
</style>