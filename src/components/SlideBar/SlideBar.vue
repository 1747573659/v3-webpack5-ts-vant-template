<template>
  <div class="drag-container-wrap">
    <div class="drag-container" ref="dragContainer">
      <!-- 容器初始背景 -->
      <div
        class="drag-bg-default"
        ref="dragBg"
        :class="{
          'bg-move': currentStatus === MOVE,
          'bg-error': currentStatus === ERROR,
          'bg-errored': currentStatus === ERRORED,
          'bg-sucess': currentStatus === SUCESS
        }"
      ></div>
      <div
        class="drag-text"
        ref="dragText"
        :class="{'text-secuss': currentStatus === SUCESS}"
      >
        <img class="svg-sucess" v-if="currentStatus === SUCESS" :src="sucessSvg" alt="arrowRightSvg"/>
        <span>{{dragTextContent}}</span>
      </div><!-- 滑动容器文本 -->
      <div ref="dragHandler"
        @touchmove="onDragHandlerTouchMove"
        @touchstart="onDragHandlerTouchStart"
        @touchend="onDragHandlerTouchEnd"
        class="drag-handler-default"
        :class="{
          'handler-move': currentStatus === MOVE,
          'handler-error': currentStatus === ERROR,
          'handler-errored': currentStatus === ERRORED,
          'handler-sucess': currentStatus === SUCESS
        }"
      >
        <img class="svg-error" v-if="[ERROR, ERRORED].includes(currentStatus)" :src="errorSvg"  alt="arrowRightSvg"/>
        <img class="svg-arrow" v-else :src="arrowRightSvg" alt="arrowRightSvg"/>
      </div>
    </div> <!--    滑块         滑块初始背景 -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import arrowRight from '@/assets/icons/arrow-right.svg'
import sucessIcon from '@/assets/icons/sucess.svg'
import error from '@/assets/icons/error.svg'

const DEFAULTTEXT = '按住滑块，拖到最右边'
const dragTextContent = ref(DEFAULTTEXT)
const dragContainer = ref()
const dragHandler = ref()
const dragBg = ref()
const arrowRightSvg = ref(arrowRight)
const sucessSvg = ref(sucessIcon)
const errorSvg = ref(error)

// 最大偏移量
let maxHandlerOffset = 0
let offsetLeft = 0

// 默认值
const DEFAULT = 'default'
// 成功
const SUCESS = 'sucess'
// 失败
const ERROR = 'error'
// 失败过
const ERRORED = 'errored'
// 移动中
const MOVE = 'move'
const currentStatus = ref<string>(DEFAULT)

const emit = defineEmits<{
  (e: 'sucess'): void
}>()

onMounted(() => {
  // 获取最大偏移量
  maxHandlerOffset = dragContainer.value.clientWidth - dragHandler.value.clientWidth
})

// 重置滑块
const resetHandler = () => {
  dragTextContent.value = DEFAULTTEXT
  dragHandler.value.style.left = '-2px'
  dragBg.value.style.width = 0
  offsetLeft = 0
}

// 验证成功事件
const sucess = () => {
  dragTextContent.value = '验证成功'
  currentStatus.value = SUCESS
  dragBg.value.style.width = '100%'
  setTimeout(() => {
    emit('sucess')
    // 重置整个滑块组件状态
    setTimeout(() => {
      currentStatus.value = DEFAULT
      resetHandler()
    }, 1000);
  }, 500);
}

const onDragHandlerTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  // 获取滑块滑动开始时距离屏幕视窗左侧的距离
  offsetLeft = dragHandler.value.getBoundingClientRect().left
}

const onDragHandlerTouchMove = (e:TouchEvent) => {
  e.preventDefault()
  // 移动滑块的时候把背景文案置为空
  dragTextContent.value = ''
  const touch = e.targetTouches[0]
  currentStatus.value = MOVE
  // 获取滑动值和可滑动值中小的那一个
  const left = Math.min(touch.clientX - offsetLeft, maxHandlerOffset)
  console.log('left: ' + left, 'offsetLeft: ' + offsetLeft, 'touch.clientX' + touch.clientX)
  // 如果滑到底
  if (left === maxHandlerOffset) {
    sucess()
  } else {
    dragHandler.value.style.left = left + 'px'
    dragBg.value.style.width = left + 50 + 'px'
  }
}
const onDragHandlerTouchEnd = (e: TouchEvent) => {
  e.preventDefault()
  // 如果没有滑到底  就将滑块重置
  if (currentStatus.value !== SUCESS) {
    currentStatus.value = ERROR
    setTimeout(() => {
      currentStatus.value = ERRORED
      resetHandler()
    }, 500);
  }
}
</script>

<style lang="scss" setup>
.drag-container-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90px;
}

/* 滑动控件容器,灰色背景 */
.drag-container {
  position: relative;
  display: inline-block;
  background: #f0f3f5;
  width: 638px;
  height: 88px;
  border: 2px solid #d4d5da;
  border-radius: 16px;
}

/* 滑块左边部分,绿色背景 */
.drag-bg-default {
  position: absolute;
  width: 0;
  top: -2px;
  left: -2px;
  height: 88px;
  border-radius: 16px;
}

/* 滑动验证容器文本 */
.drag-text {
  position: absolute;
  width: 100%;
  height: 100%;

  /* 文字水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;

  /* 文字垂直居中,这里不能用百分比,因为百分比是相对原始line-height的,而非div高度 */
  line-height: 88px;

  /* 文本不允许选中 */
  user-select: none;

  /* 文字样式 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  color: $font-color-1;
}

/* 滑块 */
.drag-handler-default {
  position: absolute;
  width: 100px;
  height: 88px;
  cursor: move;
  border-radius: 16px;
  background-color: #fff;
  border: 2px solid $borderColor;
  top: -2px;
  left: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-move {
  border: 2px solid #29cc60;
  background-color: #e9fdeb;
}
.bg-error {
  border: 2px solid #f74d3b;
  background: #fdf2ee;
}
.bg-errored {
  border: none;
  background-color: #fff;
}
.bg-sucess {
  border: 2px solid #29cc60;
  background-color: #e9fdeb;
}
.handler-move {
  border: 2px solid #29cc60;
  background-color: #e9fdeb;
}
.handler-error {
  border: 2px solid #f74d3b;
  background: #fdf2ee;
}
.handler-errored {
  border: 2px solid #f74d3b;
  background: #fdf2ee;
}
.handler-sucess {
  background-color: #fff;
  border: 2px solid $borderColor;
  display: none;
}
.text-secuss {
  color: #29cc60;
}
.svg-arrow {
  width: 34px;
  height: 28px;
}
.svg-error {
  width: 28px;
  height: 28px;
}
.svg-sucess {
  width: 30px;
  height: 28px;
  margin-right: 16px;
}
</style>