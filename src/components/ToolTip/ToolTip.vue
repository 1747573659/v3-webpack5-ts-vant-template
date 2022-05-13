<template>
  <div class="tooltip">
    <svg @touchstart="svgTouchstart" @touchend="svgTouchend" class="svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6.24988" y="6.25" width="27.5" height="27.5" rx="13.75" :stroke="svgColor" stroke-width="2.5"/>
      <circle cx="20" cy="14.167" r="1.875" :fill="svgColor"/>
      <rect x="18.75" y="18.542" width="2.5" height="9.16667" rx="1.25" :fill="svgColor"/>
    </svg>
    <div ref="tagWrap" class="tag-wrap" :class="{show: showTip}">
      <div class="tag">
        通过转账、网商小程序支付交易转入的资金会进入交易户
      </div>
      <div class="tag-arrow"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const svgColor = ref('#B8BABE')
const showTip = ref(false)
const tagWrap = ref()

onMounted(() => {
  tagWrap.value.style.left = (-tagWrap.value.offsetWidth / 2) + 10 + 'px'
  tagWrap.value.style.top = -tagWrap.value.offsetHeight - 10 + 'px'
})

const svgTouchstart = () => {
  svgColor.value = '#0089E5'
  showTip.value = true
}
const svgTouchend = () => {
  svgColor.value = '#B8BABE'
  showTip.value = false
}
</script>

<style lang="scss" scoped>
.tooltip {
  width: 40px;
  height: 40px;
  position: relative;
  .tag-wrap {
    visibility: hidden;
    position: absolute;
    left: 20px;
    top: 0;
    background: $white;
    box-shadow: 0 4px 20px rgba(50, 50, 51, .12);
    padding: 24px;
    border-radius: 20px;
    .tag {
      font-weight: 400;
      font-size: 28px;
      color: #323233;
      min-width: 450px;
    }
    .tag-arrow {
      border-width: 10px;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      bottom: -8px;
      left: 50%;
      transform: translate(-50%);
      margin-right: 3px;
      border-top-color: $white;
      border-bottom-width: 0;
    }
    .tag-arrow::after {
      bottom: 1px;
      margin-left: -6px;
      border-top-color: $white;
      border-bottom-width: 0;
      content: ' ';
      /* stylelint-disable-next-line declaration-block-no-shorthand-property-overrides */
      border-width: 6px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      /* stylelint-disable-next-line declaration-block-no-shorthand-property-overrides */
      border-color: transparent;
      border-style: solid;
    }
  }
  .svg {
    width: 40px;
    height: 40px;
  }
  .show {
    visibility: visible;
  }
}
</style>