<template>
  <div class="withdrawConfig-wrap">
    <div class="withdrawConfig-header-wrap">
      <div class="withdrawConfig-header">
        <div class="withdrawConfig-header-left">
          <div class="withdrawConfig-header-title">定时提现</div>
          <div class="withdrawConfig-tips" v-if="state.planType === 0">
            设置每天固定提现时间，提现当前账户全部余额
          </div>
          <div class="withdrawConfig-tips-timing" v-if="state.planType === 1">
            每天 {{ state.planTime }}
          </div>
        </div>
        <van-switch
          :modelValue="state.planType"
          size="24px"
          :active-value="1"
          :inactive-value="0"
          @change="handleSwitchChange" />
      </div>
    </div>
    <div class="withdrawConfig-tips withdrawConfig-footer">
      <div><van-icon name="warning-o" />温馨提示：</div>
      <div>1、设置定时提现后，仍可点击提现钮，手动提现</div>
      <div>2、定时提现时间设置完成后，每天届时会把当前账户可提现余额，全部提现</div>
    </div>
    <!-- confirmTimePicker -->
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
  type stateType = {
    planType: number // 1--每天
    planTime: string
  }
  const timePickerVisible = ref(false)
  const showOverlay = ref(false)
  const oldState: stateType = reactive({
    planType: 0,
    planTime: '00:00'
  })
  const state: stateType = reactive({
    planType: 0,
    planTime: '00:00'
  })
  const handleSwitchChange = (val: number) => {
    console.log('switch')
    if (val) {
      timePickerVisible.value = true
    } else {
      state.planTime = '00:00'
      state.planType = 0
      // 关闭定时提现选项
      submitTimePicker(val, '')
    }
  }
  const submitTimePicker = (planType: number, planTime: string) => {
    showOverlay.value = true
    const params = {
      planType,
      planTime: '',
      shopAdminId: 70,
      walletId: 'QB00044964000001ff'
    }
    params.planType === 1 && (params.planTime = planTime)
    return reviseTimingWithdrawal(params)
      .then(() => {
        console.log('chengg')
        state.planType = planType
        state.planTime = planTime || '00:00'
        Object.assign(oldState, state)
        showOverlay.value = false
      })
      .catch(() => {
        console.log('shibai')
        state.planType = oldState.planType
        state.planTime = oldState.planTime
        showOverlay.value = false
        return Promise.reject()
      })
  }
  const confirmTimePicker = (planTime: string) => {
    console.log('确认')
    return submitTimePicker(1, planTime)
  }
  onMounted(async () => {
    const res: any = await queryTimingWithdrawalInfo({
      shopAdminId: 70,
      walletId: 'QB00044964000001'
    })
    state.planTime = res.planTime || '00:00'
    state.planType = res.planType
    Object.assign(oldState, state)
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
  .withdrawConfig-header-wrap {
    padding: 0 24px;
    background-color: #fff;
  }
  .withdrawConfig-header {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 30px 0;
    border-bottom: 1px solid $border-split-color-1;
  }
  .withdrawConfig-tips {
    display: inline-block;
    font-size: 24px;
    line-height: 1.4;
    color: $font-color-2;
    text-align: left;
    margin-top: 20px;
    &-timing {
      display: inline-block;
      font-size: 28px;
      padding: 20px;
      margin-top: 26px;
      color: $primaryColor;
      background-color: $painColor;
      font-weight: 500;
    }
    & > span {
      margin-top: 20px;
    }
  }
  .withdrawConfig-footer {
    margin: 26px 24px 0;
  }
  .withdrawConfig-header-title {
    font-size: 32px;
    color: $font-color-1;
  }
  .withdrawConfig-header-left {
    flex: 1;
  }
</style>
