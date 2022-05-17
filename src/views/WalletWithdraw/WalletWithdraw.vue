<template>
  <div class="withdraw">
    <!-- 银行卡信息 -->
    <account-info></account-info>
    <!-- 提现信息 -->
    <withdraw-box v-model:money="money"></withdraw-box>
    <div class="withdraw-btn">
      <large-button :disabled="withdrawDisabled" @click="withdrawApply">提现</large-button>
    </div>
    <!-- 验证码 -->
    <popur-verify-code v-model:show="showVerifyPopur" @handle-verify-code="handleVerifyCode"></popur-verify-code>
    <!-- 接口loading -->
    <overlay-loading :show="showOverlay" content="登录中..."></overlay-loading>
    <!-- 确认提现弹窗 -->
    <withdraw-confirm v-model:show="showWithdrawConfirm" @confirmWithdraw="confirmWithdraw"></withdraw-confirm>
    <!-- 结果页 -->
    <result-page v-model:show="showResultPage"></result-page> 
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive, provide } from 'vue';
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
import AccountInfo from './components/AccountInfo/AccountInfo.vue'
import WithdrawBox from './components/WithdrawBox/WithdrawBox.vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import PopurVerifyCode from './components/PopurVerifyCode/PopurVerifyCode.vue'
import { Money } from './types';
import { VerifyCode } from '@/components/MsgVerify/types';
import WithdrawConfirm from './components/WithdrawConfirm/WithdrawConfirm.vue'
import ResultPage from './components/ResultPage/ResultPage.vue'

import { withdrawDetail } from '@/api/wallet'

import { useStore } from 'vuex'
import { UserInfo } from '@/store/storeTypes';
import { withdrawDetailRep } from '@/api/types';

import { withdrawApplyApi, withdrawConfirmApi } from '@/api/wallet'

const userInfo: UserInfo = useStore().state.userInfo

const withdrawDetailInfo = reactive<withdrawDetailRep>({
  accountName: '',
  availableAmount: 0,
  bankCard: '',
  legalPhone: '',
  openBank: '',
  openBankCnap: '',
  tradeBalanceAmount: '',
  tradeDepositAmount: ''
})

provide('withdrawDetailInfo', withdrawDetailInfo)

const getWithdrawDetail = async () => {
  const { walletId, shopAdminId } = userInfo
  try {
    const res = await withdrawDetail({
      walletId,
      shopAdminId
    })
    Object.assign(withdrawDetailInfo, res)
  } catch (e) {}
}

onMounted(() => {
  getWithdrawDetail()
})

const showOverlay = ref(false)

const money = ref<Money>('')

const withdrawDisabled = computed(() => !String(money.value).length)

const showVerifyPopur = ref(false)

const withdrawApply = () => {
  showVerifyPopur.value = true
}

const handlewithdrawApply = async () => {
  const { walletId, shopAdminId } = userInfo
  let data = {
    walletId,
    shopAdminId,
    totalAmount: Number(money.value)
  }
  try {
    const res = await withdrawApplyApi(data)
  } catch(e) {}
}

const handleVerifyCode = (verifyCode: VerifyCode) => {
  console.log(verifyCode)
  showOverlay.value = true
  setTimeout(() => {
    showOverlay.value = false
    showVerifyPopur.value = false
    dialogConfirm()
  }, 2000);
}

const showWithdrawConfirm = ref(false)

// 调用确认弹窗
const dialogConfirm = () => {
  showWithdrawConfirm.value = true
}

const showResultPage = ref(false)

// 已确认
const confirmWithdraw = () => {
  showWithdrawConfirm.value = false
  setTimeout(() => {
    showResultPage.value = true
  }, 1000)
}

const handleConfirm = async () => {
  let data = {
    sn: "",
    thirdSn: "",
    walletId: ""
  }
  try {
    const res = await withdrawConfirmApi(data)
  } catch(e) {}
}

</script> 

<style lang="scss" scoped>
.withdraw-btn {
  padding: 32px;
}
</style>
<style lang="scss">
</style>
