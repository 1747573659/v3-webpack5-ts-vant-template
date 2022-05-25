<template>
  <div class="withdraw">
    <!-- 银行卡信息 -->
    <account-info></account-info>
    <!-- 提现信息 -->
    <withdraw-box :error-msg="withdrawErrorMsg" v-model:money="money"></withdraw-box>
    <div class="withdraw-btn">
      <large-button type="primary" :loading="withdrawLoading" :disabled="withdrawDisabled" @click="withdrawApply">提现</large-button>
    </div>
    <!-- 验证码 -->
    <popur-verify-code :money="money" v-model:show="showVerifyPopur" @resend="resend" :error-msg="verifyErrorMsg" @click-close-icon="clickCloseIcon" @handle-verify-code="handleVerifyCode"></popur-verify-code>
    <!-- 接口loading -->
    <overlay-loading :show="showOverlay" :content="overLayContent"></overlay-loading>
    <!-- 确认提现弹窗 -->
    <withdraw-confirm v-model:show="showWithdrawConfirm" @confirmWithdraw="confirmWithdraw"></withdraw-confirm>
    <!-- 结果页 -->
    <result-page :money="money" :errorMsg="resultPageErrorMsg" v-model:show="showResultPage"></result-page> 
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive, provide, watch } from 'vue';
import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
import AccountInfo from './components/AccountInfo/AccountInfo.vue'
import WithdrawBox from './components/WithdrawBox/WithdrawBox.vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import PopurVerifyCode from './components/PopurVerifyCode/PopurVerifyCode.vue'
import { Money } from './types';
import { VerifyCode } from '@/components/MsgVerify/types';
import WithdrawConfirm from './components/WithdrawConfirm/WithdrawConfirm.vue'
import ResultPage from './components/ResultPage/ResultPage.vue'
import { useStore } from 'vuex'
import { UserInfo } from '@/store/storeTypes';
import { withdrawDetailRep, withdrawConfirmReq } from '@/api/types';
import { withdrawApplyApi, withdrawDetail, withdrawConfirmApi, smsSend, smsValidCode } from '@/api/wallet'
import useCheckNeedVerify from '@/hooks/useCheckNeedVerify'
import store from '@/store';

const userInfo: UserInfo = useStore().state.userInfo

const withdrawDetailInfo = reactive<withdrawDetailRep>({
  accountName: '',
  availableAmount: 0,
  bankCard: '',
  legalPhone: '',
  openBank: '',
  openBankCnap: '',
  tradeBalanceAmount: 0,
  tradeDepositAmount: 0
})

provide('withdrawDetailInfo', withdrawDetailInfo)

const withdrawErrorMsg = ref('')
const verifyErrorMsg = ref('')
const overLayContent = ref('加载中')

const getWithdrawDetail = async () => {
  showOverlay.value = true
  overLayContent.value = '加载中'
  const { walletId, shopAdminId } = userInfo
  try {
    const res = await withdrawDetail({
      walletId,
      shopAdminId
    })
    store.dispatch('setUserInfo', {
      loginName: res.legalPhone
    })
    Object.assign(withdrawDetailInfo, res)
  } catch (e) {} finally {
    showOverlay.value = false
  }
}

onMounted(() => {
  getWithdrawDetail()
})

const showOverlay = ref(false)

const money = ref<Money>('')

const withdrawDisabled = computed(() => !String(money.value).length)

const withdrawLoading = ref(false)

const showVerifyPopur = ref(false)

const confirmRequestData = ref<withdrawConfirmReq>({
  sn: "",
  thirdSn: "",
  walletId: ""
})

// 提现短信验证
const handledMsgSend = async () => {
  let data = {
    phone: userInfo.loginName,
    smsBusinessType: 2
  }
  try {
    const res = await smsSend(data)
    verifyErrorMsg.value = ''
    // 分两种情况，一种是提现按钮发起的短信发送
    // 另一种是，重新发送按钮发起的短信发送
    // 通过当前弹窗是否展示来判断

    if (showVerifyPopur.value) { // 如果是重新发送的逻辑
      // 如果成功
      if (res === userInfo.loginName) {
        resetVerifyFunc()
      } else {
        verifyErrorMsg.value = res
      }
    } else { // 如果是提现发送短信的逻辑
      // 如果成功
      if (res === userInfo.loginName) {
        showVerifyPopur.value = true
      } else {
        withdrawErrorMsg.value = res
        withdrawLoading.value = false
      }
    }
  } catch (e) {
    if (!showVerifyPopur.value) {
      withdrawLoading.value = false
    }
  } finally {
  }
}
const sendMsg = useCheckNeedVerify(handledMsgSend)

// 用于保存重置定时器的方法
let resetVerifyFunc: () => void
const resend = async (resetVerify: () => void) => {
  resetVerifyFunc = resetVerify
  try {
    await sendMsg()
  } catch(e) {}
}

watch(money, () => {
  withdrawErrorMsg.value = ''
})

const checkMoney = () => {
  return new Promise((resolve, reject) => {
    let trueMoney = Number(money.value) * 100
    if (trueMoney === 0) {
      reject('提现金额不能为0')
    } else if (trueMoney > withdrawDetailInfo.tradeBalanceAmount) {
      reject('提现金额只能小于等于交易户余额')
    } else {
      resolve(true)
    }
  })
}

const withdrawApply = async () => {
  withdrawLoading.value = true
  withdrawErrorMsg.value = ''
  checkMoney().then(async () => {
    try {
      await sendMsg()
    } catch(e) {
    } finally {
    }
  },
  err => {
    withdrawErrorMsg.value = err
  }).finally(() => {
    withdrawLoading.value = false
  })
}

// 提现申请
const handlewithdrawApply = async () => {
  const { walletId, shopAdminId } = userInfo
  let data = {
    walletId,
    shopAdminId,
    totalAmount: Number(money.value) * 100
  }
  try {
    const res = await withdrawApplyApi(data)
    // 如果成功就调用确认弹窗
    if(typeof res === 'string') {
      withdrawErrorMsg.value = res
    } else {
      confirmRequestData.value = {
        sn: res.sn,
        thirdSn: res.thirdSn,
        walletId: walletId
      }
      dialogConfirm()
    }
  } catch(e) {
    dialogConfirm()
  } finally {
    withdrawLoading.value = false
  }
}

const handleVerifyCode = async (verifyCode: VerifyCode) => {
  showOverlay.value = true
  overLayContent.value = '请稍候...'
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

// 短信验证弹窗点击关闭图标的事件
const clickCloseIcon = () => {
  withdrawLoading.value = false
}

const showWithdrawConfirm = ref(false)

// 调用确认弹窗
const dialogConfirm = () => {
  showWithdrawConfirm.value = true
}
const showResultPage = ref(false)
// 从结果页返回的时候调用一遍详情接口并且将金额清空
watch(showResultPage, (newVal) => {
  if (!newVal) {
    money.value = ''
    getWithdrawDetail()
  }
})

// 已确认
const resultPageErrorMsg = ref('')
const confirmWithdraw = async () => {
  resultPageErrorMsg.value = ''
  try {
    const res = await withdrawConfirmApi(confirmRequestData.value)
    if (typeof res === 'string') {
      resultPageErrorMsg.value = res
    }
    showWithdrawConfirm.value = false
    showResultPage.value = true
  } catch(e) {
    showWithdrawConfirm.value = false
  }
}

</script> 

<style lang="scss" scoped>
.withdraw-btn {
  padding: 32px;
  &:deep(.van-button--primary) {
    border: none;

    @include themify {
      background-color: themed('primaryColor');
    }
  }
}
</style>
<style lang="scss">
</style>
