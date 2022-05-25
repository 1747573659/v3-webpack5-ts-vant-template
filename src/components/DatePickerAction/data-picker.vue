<script lang="ts" setup>
  import { ref, toRefs, watch, reactive } from 'vue'
  import { Toast } from 'vant'
  import moment from 'moment'
  import { formatIosDate } from '@/utils/commonFunc'
  const props = defineProps<{
    modelValue: string[]
    visible: boolean
  }>()
  const { visible, modelValue } = toRefs(props)
  const activeTab = ref('start') // start end

  const time = reactive<{ [key: string]: Date }>({
    start: new Date(),
    end: new Date()
  })
  const formatter = (type: string, val: string) => {
    if (type === 'year') {
      return val + '年'
    }
    if (type === 'month') {
      return val + '月'
    }
    if (type === 'day') {
      return val + '日'
    }
    return val
  }
  const handleChangeTab = (tabName: string) => {
    activeTab.value = tabName
  }
  const handleChange = (val: Date) => {
    if (activeTab.value === 'start') {
      // 选择开始时间
      const end = moment(time['end']).format('YYYY-MM-DD')
      const start = moment(val).format('YYYY-MM-DD')
      console.log(moment(start).isAfter(moment(end)), '开始时间')
      if (moment(start).isAfter(moment(end))) {
        // Toast('开始时间不能大于结束时间')
        time['end'] = val
      } else if (moment(start).add(30, 'days').isBefore(moment(end))) {
        Toast('最多选择31天')
        // time['start'] = new Date(moment(time['start']).add(30, 'days').format('YYYY/MM/DD'))
      }
    } else {
      // 选结束时间
      const end = moment(val).format('YYYY-MM-DD')
      const start = moment(time['start']).format('YYYY-MM-DD')
      console.log(moment(end).isBefore(moment(start)), '结束时间')
      if (moment(end).isBefore(moment(start))) {
        // Toast('结束时间不能小于开始时间')
        time['start'] = val
      } else if (moment(end).subtract(30, 'days').isAfter(moment(start))) {
        Toast('最多选择31天')
        // time['start'] = new Date(moment(time['end']).subtract(30, 'days').format('YYYY/MM/DD'))
      }
    }
  }
  watch(modelValue, newVal => {
    time.start = new Date(formatIosDate(newVal[0] || ''))
    time.end = new Date(formatIosDate(newVal[1] || ''))
  })
  watch(visible, () => {
    time.start = new Date(formatIosDate(modelValue.value[0] || ''))
    time.end = new Date(formatIosDate(modelValue.value[1] || ''))
    handleChangeTab('start')
  })
  const getTime = () => [
    moment(time['start']).format('YYYY-MM-DD'),
    moment(time['end']).format('YYYY-MM-DD')
  ]
  defineExpose({
    getTime
  })
</script>
<template>
  <div v-show="visible">
    <div class="data-picker-header">
      <div class="data-title" @click="handleChangeTab('start')">
        <div class="title">开始时间</div>
        <div class="data">{{ moment(time['start']).format('YYYY年MM月DD日') }}</div>
        <div :class="{ 'bottom-border': true, active: activeTab === 'start' }"></div>
      </div>
      <div class="data-title" @click="handleChangeTab('end')">
        <div class="title">结束时间</div>
        <div class="data">{{ moment(time['end']).format('YYYY年MM月DD日') }}</div>
        <div :class="{ 'bottom-border': true, active: activeTab === 'end' }"></div>
      </div>
    </div>
    <van-datetime-picker
      v-model="time[activeTab]"
      type="date"
      v-bind="$attrs"
      title="自定义列排序"
      :columns-order="['year', 'month', 'day']"
      @change="handleChange"
      :formatter="formatter" />
  </div>
</template>
<style lang="scss" scoped>
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
  .data-picker-header {
    display: flex;
    justify-content: space-between;
    padding: 50px;
    flex-wrap: wrap;
    .data-title {
      width: 300px;
      text-align: center;
      .title {
        font-size: 28px;
        color: $font-color-3;
      }
      .data {
        font-size: 36px;
        font-weight: 500;
        margin: 14px 0;
      }
    }
  }
  .bottom-border {
    background-color: transparent;
    height: 4px;
    width: 80px;
    display: inline-block;
    &.active {
      @include themify {
        background-color: themed('primaryColor');
      }
    }
  }
  .van-picker {
    :deep(.van-picker__toolbar) {
      display: none;
    }
  }
</style>
