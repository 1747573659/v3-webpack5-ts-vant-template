<script lang="ts" setup>
  import { ref, watch, toRefs, Ref, reactive,  } from 'vue'
  import moment from 'moment'
  type selectTimeType = {
    commonType: boolean
    index: Ref<number> | number
    value: string[]
    label: string
  }
  const props = defineProps<{
    confirm: (time: string[]) => Promise<any>
  }>()
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
      label: '昨日',
      value() {
        return [
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
          moment().subtract(1, 'days').format('YYYY-MM-DD')
        ]
      }
    },
    {
      key: 3,
      label: '近三天',
      value() {
        return [moment().subtract(2, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      }
    },
    {
      key: 4,
      label: '近七天',
      value() {
        return [moment().subtract(6, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      }
    },
    {
      key: 5,
      label: '近一个月',
      value() {
        return [
          moment().subtract(1, 'months').add(1, 'days').format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD')
        ]
      }
    }
  ]
  // 日期范围
  const dateRange = reactive({
    minDate: new Date('2022-5-6'),
    maxDate: new Date()
  })
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
    const _time = oldTimeData.commonType
      ? []
      : [new Date(oldTimeData.value[0]), new Date(oldTimeData.value[1])]
    dateRef.value.reset(_time)
    dateRef.value.scrollToDate(new Date(oldTimeData.value[0]))
  }
  const handleBack = () => {
    visible.value = false
  }
  // 确定保存常规时间成功后调用
  const changeLabel = () => {
    selectTimeData.label = selectTimeData.commonType
      ? commonTimeListEnum[selectTimeData.index].label
      : selectTimeData.value.join(' 至 ')
    oldTimeData = { ...selectTimeData }
  }
  // 选择时间(常规)
  const handleChangeDate = (index: number) => {
    selectTimeData.index = index
    selectTimeData.commonType = true
    selectTimeData.value = commonTimeListEnum[index].value()
  }
  const submitCommonData = () => {
    confirm.value(selectTimeData.value).then(() => {
      changeLabel()
      handleBack()
    })
  }
  // 选择时间自定义-确认
  const confirmCusTime = (time: string[]) => {
    selectTimeData.index = -1
    selectTimeData.commonType = false
    selectTimeData.value = [
      moment(time[0]).format('YYYY-MM-DD'),
      moment(time[1]).format('YYYY-MM-DD')
    ]
    submitCommonData()
  }

  watch(visible, (newVal: boolean) => {
    if (newVal) {
      Object.assign(selectTimeData, oldTimeData)
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
      <span class="datepicker-action-back" v-show="cusVisible" @click="cusVisible = false"
        >取消</span
      >
      <span class="datepicker-action-title">选择日期</span>
      <img src="../../assets/img/close.png" alt="" class="close-btn" @click="handleBack" />
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
      <div class="datepicker-action-footer">
        <van-button type="primary" @click="submitCommonData">确认</van-button>
      </div>
    </div>
    <van-calendar
      v-show="cusVisible"
      type="range"
      ref="dateRef"
      class="van-calendar-wrap"
      :poppable="false"
      :show-mark="false"
      first-day-of-week="1"
      allow-same-day
      :row-height="60"
      :min-date="dateRange.minDate"
      :max-date="dateRange.maxDate"
      :max-range="31"
      range-prompt="最多选择31天"
      @confirm="confirmCusTime">
    </van-calendar>
  </van-action-sheet>
  <!-- <van-calendar
    v-model:show="cusVisible"
    type="range"
    ref="dateRef"
    class="van-calendar-wrap"
    :poppable="false"
    :show-mark="false"
    color="#00A3FF"
    first-day-of-week="1"
    allow-same-day
    :row-height="60"
    :min-date="dateRange.minDate"
    :max-date="dateRange.maxDate"
    :max-range="31"
    range-prompt="最多选择31天"
    @confirm="confirmCusTime">
  </van-calendar> -->
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
}
.datepicker-action-title {
  color: $font-color-1;
  font-size: 36px;
  font-weight: 500;
}
.datepicker-action-back {
  color: $font-color-2;
  position: absolute;
  font-size: 32px;
  top: 32px;
  left: 24px;
  margin-top: 6px;
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
