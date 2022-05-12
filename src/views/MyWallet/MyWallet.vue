<template>
  <div class="my-wallet">
    <wallet-info></wallet-info>
    <wallet-card></wallet-card>
    <handle-group></handle-group>
    <div class="logout">
      <logout-btn></logout-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WalletInfo from './components/WalletInfo.vue'
import WalletCard from './components/WalletCard.vue'
import HandleGroup from './components/HandleGroup.vue'
import LogoutBtn from '@/components/LogoutBtn/LogoutBtn.vue'
</script>

<style lang="scss" scoped>
.logout {
  padding: 0 24px;
}
</style>
