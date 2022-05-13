<template>
  <div class="withdraw">
    <account-info></account-info>
    <withdraw-box v-model:money="money"></withdraw-box>
    <div class="withdraw-btn">
      <large-button :disabled="withdrawDisabled" @click="withdrawApply">提现</large-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import AccountInfo from './components/AccountInfo/AccountInfo.vue'
import WithdrawBox from './components/WithdrawBox/WithdrawBox.vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import { Money } from './types';

const money = ref<Money>('')

const withdrawDisabled = computed(() => !String(money.value).length)

const withdrawApply = () => {
  console.log(money.value)
}

</script>

<style lang="scss" scoped>
.withdraw-btn {
  padding: 32px;
}
</style>
