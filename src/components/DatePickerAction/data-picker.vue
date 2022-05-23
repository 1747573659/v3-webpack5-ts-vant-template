<script lang="ts" setup>
  import { ref, toRefs, watch, computed, reactive } from 'vue'
  import moment from 'moment'
  const props = defineProps<{
    modelValue: string[]
    visible: boolean
  }>()
  const { visible, modelValue } = toRefs(props)
  const activeTab = ref('start') // start end
  const time = reactive({
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

  watch(modelValue, newVal => {
    time.start = new Date(newVal[0])
    time.end = new Date(newVal[1])
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
