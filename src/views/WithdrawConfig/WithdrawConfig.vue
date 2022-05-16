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
            :modelValue="state.planType"
            size="24px"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitchChange" />
        </div>
        <div class="withdrawConfig-edit" v-if="state.planType === 1">
          <div class="withdrawConfig-tips-timing">每天 {{ state.planTime }}</div>
          <div class="withdrawConfig-icon-wrap" @click="() => (timePickerVisible = true)">
            <img class="withdrawConfig-icon-info" src="../../assets/img/edit.png" alt="" />
            修改
          </div>
        </div>
      </div>
    </div>
    <div class="withdrawConfig-tips withdrawConfig-footer">
      <img class="withdrawConfig-icon-info" src="../../assets/img/info-o.png" alt="" />
      <span>温馨提示：</span>
      <span>设置定时提现后，仍可手动提现</span>
    </div>
    <!-- confirmTimePicker -->
    <TimePickerAction
      title="选择提现时间"
      v-model="state.planTime"
      v-model:visible="timePickerVisible"
      :recentChoose="recentTime"
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
    planTime?: string
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
      timePickerVisible.value = true
    } else {
      // MYTODO: 增加关闭提示弹框
      // state.planTime = '00:00'
      state.planType = 0
      // 关闭定时提现选项
      submitTimePicker(val, '')
    }
  }
  const submitTimePicker = (planType: number, planTime: string) => {
    showOverlay.value = true
    const params: editInfoType = {
      planType,
      shopAdminId: 70,
      walletId: 'QB00044964000001'
    }
    params.planType === 1 && (params.planTime = planTime)
    return reviseTimingWithdrawal(params)
      .then(() => {
        console.log('chengg')
        state.planType = planType
        planTime && (state.planTime = planTime)
        Object.assign(oldState, state)
        showOverlay.value = false
      })
      .catch(() => {
        console.log('shibai')
        state.planType = oldState.planType
        // state.planTime = oldState.planTime
        planType && (state.planTime = planTime)
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
    padding-top: 20px;
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
    padding: 30px 0;
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
      color: $primaryColor;
      font-weight: 500;
    }
  }
  .withdrawConfig-edit {
    display: flex;
    align-items: center;
    margin: 10px 0 38px;
  }
  .withdrawConfig-icon-wrap {
    color: $font-color-1;
    padding: 0 30px 0 34px;
    background-color: $bg-light-color-1;
    height: 52px;
    line-height: 52px;
    border-radius: 26px;
    margin-left: 20px;
  }
  .withdrawConfig-icon-info {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    margin-right: 14px;
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
