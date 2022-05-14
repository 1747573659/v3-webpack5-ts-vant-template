<script lang="ts" setup>
  import { ref, watch, toRefs } from 'vue'
  const props = defineProps<{
    modelValue: string
    visible: boolean
    title: string
    submit: (selectTime: string) => Promise<any>
  }>()
  const timeListEnum = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ]
  const { modelValue, visible, title } = toRefs(props)
  const emit = defineEmits<{
    (e: 'update:modelValue', selectTime: string): void
    (e: 'update:visible', visible: boolean): void
  }>()
  const selectTime = ref('')
  const handleBack = () => {
    emit('update:visible', false)
  }
  const handleConfirm = () => {
    props.submit(selectTime.value).then(() => {
      emit('update:modelValue', selectTime.value)
      emit('update:visible', false)
    })
  }
  const handleChangeSelect = (time: string) => {
    selectTime.value = time
  }
  watch(modelValue, (newVal: string) => {
    selectTime.value = newVal || '00:00'
  })
  watch(visible, () => {
    selectTime.value = modelValue.value || '00:00'
  })
</script>
<template>
  <van-action-sheet v-model:show="visible" :closeable="false">
    <div class="timepicker-action-wrap">
      <div class="timepicker-action-header">
        <span class="timepicker-action-back" @click="handleBack">返回</span>
        <span class="timepicker-action-title">{{ title }}</span>
        <span class="timepicker-action-confirm" @click="handleConfirm">确定</span>
      </div>
      <div class="timepicker-action-main">
        <div
          :class="`timepicker-action-item ${selectTime === item ? 'active' : ''}`"
          v-for="item in timeListEnum"
          :key="item"
          @click="handleChangeSelect(item)">
          <span>
            {{ item }}
          </span>
          <img src="@/assets/img/checked.png" alt="" />
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>
<style lang="scss" scoped>
  .timepicker-action-wrap {
    font-size: 32px;
  }
  .timepicker-action-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 34px 24px 60px;
  }
  .timepicker-action-title {
    color: $font-color-1;
    font-size: 36px;
    font-weight: 500;
  }
  .timepicker-action-back {
    color: $font-color-2;
  }
  .timepicker-action-confirm {
    font-weight: 500;
    color: $primaryColor;
  }
  .timepicker-action-main {
    padding: 0 24px;
    max-height: 900px;
    overflow-y: auto;
  }
  .timepicker-action-item {
    border-bottom: 1px solid $border-split-color-1;
    font-size: 32px;
    padding: 32px 0;
    color: $font-color-3;
    &.active {
      color: $primaryColor;
      & > img {
        display: block;
      }
    }
    & > img {
      float: right;
      display: none;
      width: 40px;
      height: 40px;
    }
  }
</style>
