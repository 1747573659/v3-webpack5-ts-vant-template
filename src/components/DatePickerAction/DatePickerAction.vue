<script lang="ts" setup>
  import { ref, watch, toRefs, Ref, reactive } from 'vue'
  import moment from 'moment'
  import timePicker from './data-picker.vue'
  type selectTimeType = {
    commonType: boolean
    index: Ref<number> | number
    value: string[]
    label: string
  }
  const props = defineProps<{
    confirm: (time: string[]) => Promise<any>
  }>()
  const minDate = ref(new Date('2022-5-6'))
  const maxDate = ref(new Date())
  const { confirm } = toRefs(props)
  const visible = ref(false)
  const commonTimeListEnum = [
    {
      key: 1,
      label: '今日',
      value() {
        return [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      }
    },
    {
      key: 2,
      label: '本周',
      value() {
        const weekOfday = parseInt(moment().format('d')) - 1
        console.log(weekOfday, 'weekOfday')
        const start = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD')
        const end = moment()
          .add(6 - weekOfday, 'days')
          .format('YYYY-MM-DD')
        return [start, end]
      }
    },
    {
      key: 3,
      label: '本月',
      value() {
        let start = moment().add(0, 'month').format('YYYY-MM') + '-01'
        let end = moment(start).add(1, 'month').add(-1, 'days').format('YYYY-MM-DD')
        return [start, end]
      }
    },
    {
      key: 4,
      label: '昨日',
      value() {
        return [
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
          moment().subtract(1, 'days').format('YYYY-MM-DD')
        ]
      }
    },
    {
      key: 5,
      label: '上周',
      value() {
        const weekOfday = parseInt(moment().format('d')) - 1
        const start = moment()
          .subtract(weekOfday + 7, 'days')
          .format('YYYY-MM-DD')
        const end = moment(start).add(6, 'days').format('YYYY-MM-DD')
        return [start, end]
      }
    },
    {
      key: 6,
      label: '上月',
      value() {
        let start = moment().subtract(1, 'months').format('YYYY-MM') + '-01'
        let end = moment(start).add(1, 'month').add(-1, 'days').format('YYYY-MM-DD')
        return [start, end]
      }
    }
  ]

  const cusVisible = ref(false)

  // 历史日期
  let oldTimeData = {
    commonType: true,
    index: 0,
    value: commonTimeListEnum[0].value(),
    label: commonTimeListEnum[0].label
  }
  // 当前展示数据
  const selectTimeData = reactive<selectTimeType>({ ...oldTimeData })
  const dateRef = ref()
  const handleShowCus = () => {
    cusVisible.value = true
  }
  const handleBack = () => {
    if (cusVisible.value) {
      cusVisible.value = false
    } else {
      visible.value = false
    }
  }
  // 确定保存常规时间成功后调用
  const changeLabel = () => {
    selectTimeData.label = selectTimeData.commonType
      ? commonTimeListEnum[selectTimeData.index].label
      : formatCusDate(selectTimeData.value)
    oldTimeData = { ...selectTimeData }
  }
  const formatCusDate = (time: string[]) =>
    time.map(item => moment(item).format('YYYY/MM/DD')).join(' 至 ')
  // 选择时间(常规)
  const handleChangeDate = (index: number) => {
    if (index === selectTimeData.index) {
      return handleBack()
    }
    selectTimeData.index = index
    selectTimeData.commonType = true
    selectTimeData.value = commonTimeListEnum[index].value()
    submitCommonData()
  }
  const submitCommonData = async () => {
    await confirm.value(selectTimeData.value).then(() => {
      visible.value = false
      changeLabel()
    })
  }
  const timePickerRef = ref()
  // 选择时间 自定义-确认
  const handleCusConfirm = async () => {
    const time = timePickerRef.value.getTime()
    selectTimeData.index = -1
    selectTimeData.commonType = false
    selectTimeData.value = [
      moment(time[0]).format('YYYY-MM-DD'),
      moment(time[1]).format('YYYY-MM-DD')
    ]
    await submitCommonData()
  }

  watch(visible, (newVal: boolean) => {
    if (newVal) {
      Object.assign(selectTimeData, oldTimeData)
      console.log(selectTimeData.value, 'selectTimeData.value')
      cusVisible.value = false
    }
  })
</script>
<template>
  <div class="billstate-date" @click="visible = true">
    <img src="../../assets/img/date.png" />
    <span>{{ selectTimeData.label }}</span>
  </div>
  <van-action-sheet class="date-picker-root" v-model:show="visible" :closeable="false">
    <div class="datepicker-action-header">
      <span class="datepicker-action-back" @click="handleBack">{{ cusVisible ? '取消' : '' }}</span>
      <span class="datepicker-action-title">选择日期</span>
      <div>
        <span class="datepicker-action-back confirm" v-if="cusVisible" @click="handleCusConfirm"
          >确定</span
        >
        <img
          v-else-if="!cusVisible"
          src="../../assets/img/close.png"
          alt=""
          class="close-btn"
          @click="handleBack" />
      </div>
    </div>
    <div class="datepicker-action-wrap" v-show="!cusVisible">
      <!-- 常用时间选择 -->
      <div class="datepicker-action-content">
        <div class="title">常用选择</div>
        <div class="item-wrap">
          <div
            :class="{
              item: true,
              active: selectTimeData.commonType && selectTimeData.index === index
            }"
            v-for="(item, index) in commonTimeListEnum"
            :key="index"
            @click="handleChangeDate(index)">
            <div>{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="datepicker-action-content">
        <div class="title">其他选择</div>
        <div class="item-wrap">
          <div :class="{ item: true, active: !selectTimeData.commonType }" @click="handleShowCus">
            <div>自定义日期</div>
          </div>
        </div>
      </div>
    </div>
    <timePicker
      :modelValue="selectTimeData.value"
      v-model:visible="cusVisible"
      ref="timePickerRef"
      :min-date="minDate"
      :max-date="maxDate" />
  </van-action-sheet>
</template>
<style lang="scss" scoped>
  .billstate-date {
    font-size: 28px;
    padding: 14px 18px;
    border-radius: 8px;
    display: flex;
    align-items: center;

    @include themify {
      color: themed('primaryColor');
      background-color: themed('painColor');
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
  .date-picker-root {
    @include themify {
      --van-button-primary-background-color: themed('primaryColor');
    }
  }
  .van-calendar {
    height: 900px !important;
    padding: 0 24px;
  }
  :deep(.van-calendar__footer) {
    .van-button {
      border-radius: 8px;
    }
  }
  :deep(.van-calendar__header-title) {
    display: none;
  }
  :deep(.van-calendar__header) {
    box-shadow: none;
  }
  .datepicker-action-footer {
    width: calc(100% - 48px);
    margin: 0 24px;
    position: absolute;
    bottom: 20px;
    .van-button {
      width: 100%;
      height: 68px;
      border-radius: 8px;
    }
  }
  .data-range-current {
    font-size: 28px;
    padding: 14px 18px;
    border-radius: 8px;

    @include themify {
      color: themed('primaryColor');
      background-color: themed('painColor');
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
  .datepicker-action-wrap {
    height: 900px;
    font-size: 32px;
  }
  .datepicker-action-header {
    text-align: center;
    padding: 34px 24px 60px;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .datepicker-action-title {
    color: $font-color-1;
    font-size: 36px;
    font-weight: 500;
  }
  .datepicker-action-back {
    color: $font-color-2;
    // position: absolute;
    font-size: 32px;
    // top: 32px;
    // left: 24px;
    // margin-top: 6px;
    &.confirm {
      // position: absolute;
      // right: 24px;
      // margin-top: 6px;
      @include themify {
        color: themed('primaryColor');
      }
    }
  }
  .close-btn {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 34px;
    top: 32px;
  }
  .datepicker-action-content {
    padding: 0 24px;
    margin-top: 60px;
    &:first-child {
      margin-top: 0;
    }
    .title {
      font-size: 28px;
      color: $font-color-3;
    }
    .item-wrap {
      margin-top: 30px;
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(3, 218px);
      grid-gap: 24px;
    }
    .item {
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 8px;
      background-color: $bg-light-color-1;
      color: $font-color-3;
      font-size: 32px;
      &.active {
        color: #fff;

        @include themify {
          background-color: themed('primaryColor');
        }
      }
    }
  }
</style>
