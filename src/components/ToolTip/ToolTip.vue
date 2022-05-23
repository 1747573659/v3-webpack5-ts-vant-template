<template>
  <div class="tooltip">
    <svg @touchstart="svgTouchstart" @touchend="svgTouchend" class="svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6.24988" y="6.25" width="27.5" height="27.5" rx="13.75" stroke="#B8BABE" stroke-width="2.5"/>
      <circle cx="20" cy="13.7705" r="1.875" fill="#B8BABE"/>
      <path d="M21.7057 18.2552C21.3728 17.901 20.8457 17.8567 20.5174 17.9408L20.51 17.9426L18.0463 18.7776C17.7538 18.855 17.5442 19.0789 17.4264 19.3298C17.3077 19.5831 17.27 19.8888 17.3437 20.1625C17.4359 20.5021 17.6207 20.7504 17.8646 20.8933C18.1072 21.0355 18.3899 21.0627 18.6579 20.9947L19.4226 20.7633L18.1176 26.9944C18.0441 27.3273 18.129 27.7397 18.3951 27.9926L18.4023 27.9987C18.7381 28.289 19.1598 28.3281 19.4564 28.2934L19.4585 28.2932C19.6228 28.2722 19.7972 28.2259 19.8708 28.2063C19.8739 28.2055 19.8768 28.2049 19.8796 28.2043C19.8819 28.2038 19.8841 28.2033 19.8862 28.2028L22.4894 27.3224C22.7923 27.2213 23.0507 27.0601 23.197 26.8055C23.3457 26.5467 23.356 26.2318 23.2458 25.8747L23.2428 25.8663C23.1275 25.5443 22.9283 25.3231 22.6778 25.2042C22.4307 25.0868 22.1536 25.078 21.8938 25.1415L20.7724 25.4534L22.0375 19.4704C22.1055 19.1424 22.0564 18.6304 21.7057 18.2552Z" fill="#B8BABE"/>
    </svg>
    <div ref="tagWrap" class="tag-wrap" :class="{show: showTip}">
      <div class="tag">
        <slot></slot>
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
  console.log(tagWrap.value.getBoundingClientRect().right - document.body.clientWidth, tagWrap.value.offsetWidth)
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
  display: inline-block;
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