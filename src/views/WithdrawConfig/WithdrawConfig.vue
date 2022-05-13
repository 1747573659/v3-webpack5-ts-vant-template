<template>
  <div class="withdrawConfig-wrap">
    <div class="withdrawConfig-header">
      <div class="withdrawConfig-header-left">
        <div class="withdrawConfig-header-title">定时提现</div>
        <div class="withdrawConfig-tips">设置每天固定提现时间，提现当前账户全部余额</div>
      </div>
      <van-switch
        :modelValue="planType"
        size="24px"
        :active-value="1"
        :inactive-value="0"
        @change="handleSwitchChange" />
    </div>
    <div class="withdrawConfig-tips">
      <van-icon name="warning-o" /><span>温馨提示：设置定时提现后，仍可手动提现</span>
    </div>
    <!-- confirmTimePicker -->
    <TimePickerAction
      title="选择提现时间"
      v-model="state.planTime"
      v-model:visible="timePickerVisible"
      :submit="confirmTimePicker" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue'
  import TimePickerAction from '@/components/TimePickerAction/TimePickerAction.vue'
  import { queryTimingWithdrawalInfo, reviseTimingWithdrawal } from '@/api/wallet'
  type stateType = {
    planType: number // 1--每天
    planTime: string
  }
  const timePickerVisible = ref(false)
  const planType = ref(0)
  const oldState: stateType = reactive({
    planType: 0,
    planTime: '00:00'
  })
  const state: stateType = reactive({
    planType: 0,
    planTime: '00:00'
  })
  const handleSwitchChange = (val: number) => {
    if (val) {
      timePickerVisible.value = true
      state.planTime = '00:00'
    } else {
      // 关闭定时提现选项
      submitTimePicker(val, '')
      planType.value = val
    }
  }
  const submitTimePicker = (planType: number, planTime: string) => {
    state.planType = planType
    state.planTime = planTime
    // mock数据
    new Promise(res => {
      res({})
    })
      .then(() => {
        console.log('成功')
      })
      .catch(() => {
        state.planType = planType === 0 ? 1 : 0
        state.planTime = planType === 0 ? 1 : 0
      })
    return reviseTimingWithdrawal({ planType, planTime })
  }
  const confirmTimePicker = (planTime: string) => {
    console.log('确认')
    return submitTimePicker(0, planTime)
  }
  onMounted(async () => {
    const res = await queryTimingWithdrawalInfo({ shopAdminId: 70, walletId: 'QB00044964000001' })
    state.planTime = res.planTime || '00:00'
    state.planType = res.planType
    Object.assign(oldState, state)
    console.log(oldState, state, res.planType, 'oldState')
  })
</script>
<style lang="scss" scoped>
  .withdrawConfig-wrap {
    height: 100%;
    overflow: auto;
    background-color: $bg-light-color-1;
    padding-top: 20px;
    box-sizing: border-box;
    text-align: left;
  }
  .withdrawConfig-header {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 30px 24px;
    background-color: #fff;
    .withdrawConfig-tips {
      margin: 20px 0 0;
    }
  }
  .withdrawConfig-tips {
    font-size: 24px;
    color: $font-color-2;
    text-align: left;
    margin: 26px 24px 0;
    & > span {
      margin-left: 12px;
    }
  }
  .withdrawConfig-header-title {
    font-size: 32px;
    color: $font-color-1;
  }
  .withdrawConfig-header-left {
    flex: 1;
  }
</style>
