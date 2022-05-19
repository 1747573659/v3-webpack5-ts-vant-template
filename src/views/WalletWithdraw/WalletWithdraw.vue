<template>
  <div class="withdraw">
    <!-- 银行卡信息 -->
    <account-info></account-info>
    <!-- 提现信息 -->
    <withdraw-box :error-msg="withdrawErrorMsg" v-model:money="money"></withdraw-box>
    <div class="withdraw-btn">
      <large-button :loading="withdrawLoading" :disabled="withdrawDisabled" @click="withdrawApply">提现</large-button>
    </div>
    <!-- 验证码 -->
    <popur-verify-code v-model:show="showVerifyPopur" :error-msg="verifyErrorMsg" @handle-verify-code="handleVerifyCode"></popur-verify-code>
    <!-- 接口loading -->
    <overlay-loading :show="showOverlay" content="请稍候..."></overlay-loading>
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
import { withdrawApplyApi, withdrawConfirmApi, smsSend, smsValidCode } from '@/api/wallet'
import useCheckNeedVerify from '@/hooks/useCheckNeedVerify'

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

const withdrawErrorMsg = ref('')
const verifyErrorMsg = ref('')

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

const withdrawLoading = ref(false)

const showVerifyPopur = ref(false)

// 提现短信验证
const handledMsgSend = async () => {
  let data = {
    phone: userInfo.loginName,
    smsBusinessType: 2
  }
  try {
    const res = await smsSend(data)
    console.log(res)
    // 如果成功
    if (res === userInfo.loginName) {
      showVerifyPopur.value = true
    } else {
      withdrawErrorMsg.value = res
    }
  } catch (e) {} finally {
    withdrawLoading.value = false
  }
}

const sendMsg = useCheckNeedVerify(handledMsgSend)

const withdrawApply = async () => {
  withdrawLoading.value = true
  try {
    const res = await sendMsg()
  } catch(e) {} finally {
  }
}

// 提现申请
const handlewithdrawApply = async () => {
  const { walletId, shopAdminId } = userInfo
  let data = {
    walletId,
    shopAdminId,
    totalAmount: Number(money.value)
  }
  try {
    const res = await withdrawApplyApi(data)
    // 如果成功就调用确认弹窗
    if(typeof res === 'string') {
      withdrawErrorMsg.value = res
    } else {
      dialogConfirm()
    }
  } catch(e) {}
}

const handleVerifyCode = async (verifyCode: VerifyCode) => {
  showOverlay.value = true
  let data = {
    code: verifyCode,
    phone: userInfo.loginName
  }
  try {
    const res = await smsValidCode(data)
    if (typeof res === 'string') {
      verifyErrorMsg.value = res
    } else {
      showVerifyPopur.value = false
      // 验证码校验通过调用提单接口
      handlewithdrawApply()
    }
  } catch(e) {
    console.log(e)
  } finally {
    showOverlay.value = false
  }
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
