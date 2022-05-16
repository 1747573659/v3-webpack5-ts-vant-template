<template>
  <div class="my-wallet">
    <!-- 基础信息 -->
    <wallet-info :walletDetailInfo="walletDetailInfo"></wallet-info>
    <!-- 余额 -->
    <wallet-card :walletDetailInfo="walletDetailInfo"></wallet-card>
    <!-- 跳转条目 -->
    <handle-group></handle-group>
    <!-- 退出登录 -->
    <div class="logout">
      <logout-btn></logout-btn>
    </div>
    <overlay-loading :show="loading" content="加载中..."></overlay-loading>
  </div>
</template>

<script lang="ts" setup>
import WalletInfo from './components/WalletInfo.vue'
import WalletCard from './components/WalletCard.vue'
import HandleGroup from './components/HandleGroup.vue'
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn.vue'
import useWalletDetail from '@/hooks/useWalletDetail'
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'

const { walletDetailInfo, loading } = useWalletDetail()
</script>

<style lang="scss" scoped>
.logout {
  padding: 0 24px;
}
</style>
