<template>
  <van-cell-group class="wallet-list-warp">
    <template v-for="item in walletList" :key="item">
      <van-cell class="cell" label="商户简称" is-link @click="cellClick(item)">
        <template #title>
          <div class="walletId">ID</div>
        </template>
        <template #label>
          <span class="shortName">商户简称</span>
        </template>
        <template #value>
          <div class="walletId">{{item.walletId}}</div>
          <span class="shortName">{{item.shopShortName}}</span>
        </template>
      </van-cell>
    </template>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import { computed } from 'vue'
import { WalletList } from '@/api/types';
const router = useRouter()
const store = useStore()

const walletList = computed<WalletList[]>(() => store.state.walletList.walletList)

const cellClick = ({ walletId }: WalletList) => {
  store.dispatch('setUserInfo', { walletId })
  router.replace('/myWallet')
}
</script>

<style lang="scss" scoped>
.wallet-list-warp {
  margin-top: 24px;
}
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