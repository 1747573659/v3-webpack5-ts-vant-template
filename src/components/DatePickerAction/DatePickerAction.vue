<script lang="ts" setup>
  import { ref, watch, toRefs, Ref, onMounted, nextTick, reactive } from 'vue'
  import moment from 'moment'
  type commonTimeEnumType = {
    key: number
    label: string
    value: () => string[]
  }
  const props = defineProps<{
    modelValue: string[]
    visible: boolean
  }>()
  const { visible, modelValue } = toRefs(props)
  const emit = defineEmits<{
    (e: 'update:modelValue', selectDate: string[]): void
    (e: 'update:visible', visible: boolean): void
    (e: 'change', selectDate: string[], label: string): void
  }>()

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
  const customTimeEnum = {
    key: 7,
    label: '自定义日期',
    custom: true,
    value() {
      let start = moment().subtract(1, 'months').format('YYYY-MM') + '-01'
      let end = moment(start).subtract(-1, 'months').add(-1, 'days').format('YYYY-MM-DD')
      return [start, end]
    }
  }
  const dateRange = reactive({
    minDate: new Date(moment().subtract(20, 'years').format('YYYY-MM-DD')),
    maxDate: new Date()
  })
  const cusVisible = ref(false)

  const selectItem: Ref<commonTimeEnumType> = ref({
    key: 0,
    label: '',
    value() {
      return []
    }
  })
  const handleShowCus = () => {
    cusVisible.value = true
    nextTick(() => {
      if (dateRef.value) {
        dateRef.value.reset([])
      }
    })
  }
  const handleBack = () => {
    emit('update:visible', false)
  }
  // 选择时间(常规)
  const handleChangeDate = (item: commonTimeEnumType) => {
    console.log(item.value(), 'item')
    selectItem.value = { ...item }
    handleBack()
    emit('change', item.value(), item.label)
  }
  // 选择时间自定义
  const confirmCusTime = (time: string[]) => {
    selectItem.value = { ...customTimeEnum }
    handleBack()
    const _time = [moment(time[0]).format('YYYY-MM-DD'), moment(time[1]).format('YYYY-MM-DD')]
    emit('change', _time, _time.join(' 至 '))
  }
  const dateRef = ref(null)
  watch(visible, (newVal: boolean) => {
    if (newVal) {
      cusVisible.value = false
    }
  })
  onMounted(() => (selectItem.value = { ...commonTimeListEnum[0] }))
</script>
<template>
  <van-action-sheet v-model:show="visible" :closeable="false">
    <div class="datepicker-action-header">
      <span class="datepicker-action-back" v-show="cusVisible" @click="handleBack">取消</span>
      <span class="datepicker-action-title">选择日期</span>
      <img src="../../assets/img/close.png" alt="" class="close-btn" @click="handleBack" />
    </div>
    <div class="datepicker-action-wrap" v-if="!cusVisible">
      <!-- 常用时间选择 -->
      <div>
        <div class="datepicker-action-content">
          <div class="title">常用选择</div>
          <div class="item-wrap">
            <div
              :class="{ item: true, active: selectItem.key === item.key }"
              v-for="(item, index) in commonTimeListEnum"
              :key="index"
              @click="handleChangeDate(item)">
              <div>{{ item.label }}</div>
            </div>
          </div>
        </div>
        <div class="datepicker-action-content">
          <div class="title">其他选择</div>
          <div class="item-wrap">
            <div class="item" @click="handleShowCus">
              <div>{{ customTimeEnum.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 自定义时间选择 -->
    <van-calendar
      type="range"
      ref="dateRef"
      class="van-calendar-wrap"
      v-else
      :poppable="false"
      :show-mark="false"
      color="#00A3FF"
      :show-confirm="false"
      :row-height="60"
      :min-date="dateRange.minDate"
      :max-date="dateRange.maxDate"
      :max-range="31"
      range-prompt="最多选择31天"
      @confirm="confirmCusTime">
    </van-calendar>
  </van-action-sheet>
</template>
<style lang="scss" scoped>
  .van-calendar {
    height: 900px !important;
    padding: 0 24px;
  }
  :deep(.van-calendar__header-title) {
    display: none;
  }
  :deep(.van-calendar__month-title) {
    text-align: left;
    padding-left: 20px;
    background-color: #f0f3f5;
    border-radius: 8px;
  }
  :deep(.van-calendar__header) {
    box-shadow: none;
  }
  .data-range-current {
    font-size: 28px;
    padding: 14px 18px;
    color: $primaryColor;
    background-color: $painColor;
    border-radius: 8px;
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
      margin-top: 0px;
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
        background-color: $primaryColor;
        color: #fff;
      }
    }
  }
</style>
