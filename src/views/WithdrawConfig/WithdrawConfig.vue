<template>
  <div class="withdrawConfig-wrap">
    <div class="withdrawConfig-header-wrap">
      <div class="withdrawConfig-header-inner">
        <div class="withdrawConfig-header">
          <div>
            <div class="withdrawConfig-header-title">定时提现</div>
            <div class="withdrawConfig-tips" v-if="state.planType === 0">
              设置每天固定提现时间，提现当前账户全部余额
            </div>
          </div>
          <van-switch
            v-btnStats="'切换状态'"
            class="switch"
            :modelValue="state.planType"
            size="24px"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitchChange" />
        </div>
        <div class="withdrawConfig-edit" v-if="state.planType === 1">
          <div class="withdrawConfig-tips-timing">每天 {{ state.planTime }}</div>
          <div v-btnStats class="withdrawConfig-icon-wrap" @click="() => (timePickerVisible = true)">
            <img class="withdrawConfig-icon-info" src="../../assets/img/edit.png" alt="" />
            <span class="text">修改</span>
          </div>
        </div>
      </div>
    </div>
    <div class="withdrawConfig-tips withdrawConfig-footer">
      <img class="withdrawConfig-icon-info" src="../../assets/img/info-o.png" alt="" />
      <span>温馨提示：</span>
      <span>设置定时提现后，仍可手动提现</span>
    </div>
    <TimePickerAction
      title="选择提现时间"
      v-model="state.planTime"
      v-model:visible="timePickerVisible"
      :submit="confirmTimePicker" />
  </div>
  <overlay-loading :show="showOverlay" content="加载中..."></overlay-loading>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue'
  import TimePickerAction from '@/components/TimePickerAction/TimePickerAction.vue'
  import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
  import { queryTimingWithdrawalInfo, reviseTimingWithdrawal } from '@/api/wallet'
  import { Dialog } from 'vant'
  import { useStore } from 'vuex'
import { UserInfo } from '@/store/storeTypes'
  const store =  useStore()
  const { shopAdminId, walletId, openId }: UserInfo = store.state.userInfo
  type stateType = {
    planType: number // 1--每天
    planTime: string
  }
  interface editInfoType extends stateType {
    shopAdminId: number
    walletId: string
  }
  const timePickerVisible = ref(false)
  const showOverlay = ref(false)
  const oldState: stateType = reactive({
    planType: 0,
    planTime: ''
  })
  const state: stateType = reactive({
    planType: 0,
    planTime: ''
  })
  const handleSwitchChange = (val: number) => {
    console.log('switch')
    if (val) {
      // 打开
      timePickerVisible.value = true
    } else {
      // 关闭
      Dialog.confirm({
        width: '351px',
        className: 'wallet-dialog',
        message: '确定要关闭定时提现吗？'
      }).then(() => {
        state.planType = 0
        // 关闭定时提现选项
        submitTimePicker(val, '')
      })
    }
  }
  const submitTimePicker = (planType: number, planTime: string) => {
    showOverlay.value = true
    const params: editInfoType = {
      planType,
      shopAdminId,
      walletId,
      planTime: ''
    }
    params.planType === 1 && (params.planTime = planTime)
    return reviseTimingWithdrawal(params)
      .then(() => {
        state.planType = planType
        planTime && (state.planTime = planTime)
        Object.assign(oldState, state)
        showOverlay.value = false
      })
      .catch(() => {
        state.planType = oldState.planType
        // state.planTime = oldState.planTime
        planType && (state.planTime = planTime)
        showOverlay.value = false
        return Promise.reject()
      })
  }
  const confirmTimePicker = (planTime: string) => {
    return submitTimePicker(1, planTime)
  }
  onMounted(async () => {
    const res: any = await queryTimingWithdrawalInfo({
      shopAdminId,
      walletId,
      openId
    })
    state.planTime = res.planTime || ''
    state.planType = res.planType
    Object.assign(oldState, state)
  })
</script>
<style lang="scss" scoped>
.withdrawConfig-wrap {
  height: 100%;
  overflow: auto;
  background-color: $bg-light-color-1;
  padding-top: 24px;
  box-sizing: border-box;
  text-align: left;
}
.withdrawConfig-header-wrap {
  padding: 0 24px;
  background-color: #fff;
}
.withdrawConfig-header-inner {
  border-bottom: 1px solid $border-split-color-1;
}
.withdrawConfig-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 31px 0;
  &:deep(.van-switch--on) {
    @include themify {
      background-color: themed('primaryColor');
    }
  }
}
.withdrawConfig-tips {
  display: inline-block;
  font-size: 24px;
  line-height: 24px;
  color: $font-color-2;
  text-align: left;
  margin-top: 20px;
  &-timing {
    display: inline-block;
    font-size: 28px;
    font-weight: 500;

    @include themify {
      color: themed('primaryColor');
    }
  }
}
.withdrawConfig-edit {
  display: flex;
  align-items: center;
  margin-bottom: 37px;
}
.withdrawConfig-icon-wrap {
  color: $font-color-1;
  background-color: $bg-light-color-1;
  height: 52px;
  line-height: 52px;
  width: 144px;
  border-radius: 40px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
  }
}
.withdrawConfig-icon-info {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin-right: 8px;
}
.withdrawConfig-footer {
  margin: 26px 24px 0;
}
.withdrawConfig-header-title {
  font-size: 32px;
  color: $font-color-1;
}
.withdrawConfig-header-top {
  flex: 1;
}
</style>
