<template>
  <div class="drag-container-wrap">
    <div class="drag-container" ref="dragContainer">
      <!-- 容器初始背景 -->
      <div class="drag-bg" ref="dragBg" :class="{'moving': moving}"></div><!-- 绿色背景 -->
      <div class="drag-text" ref="dragText">{{dragTextContent}}</div><!-- 滑动容器文本 -->
      <div ref="dragHandler"
        v-if="!isSucess"
        @touchmove="onDragHandlerTouchMove"
        @touchstart="onDragHandlerTouchStart"
        @touchend="onDragHandlerTouchEnd"
        class="drag-handler dragHandlerBg"
        :class="{'moving': moving}"
      >
      </div>
    </div> <!--    滑块         滑块初始背景 -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const DEFAULTTEXT = '按住滑块，拖到最右边'
const dragTextContent = ref(DEFAULTTEXT)
const dragContainer = ref()
const dragHandler = ref()
const dragBg = ref()
// 最大偏移量
let maxHandlerOffset = 0
// 是否成功
const isSucess = ref(false)
// 是否在滑动
const moving = ref(false)

onMounted(() => {
  // 获取最大偏移量
  maxHandlerOffset = dragContainer.value.clientWidth - dragHandler.value.clientWidth
  console.log(maxHandlerOffset)
})
const sucess = () => {
  dragTextContent.value = '验证成功'
  isSucess.value = true
  dragBg.value.style.width = '100%'
}
const onDragHandlerTouchStart = (e:any) => {
  const offsetLeft = dragContainer.value.getBoundingClientRect().left
  console.log(offsetLeft)
}
const onDragHandlerTouchMove = (e:any) => {
  // 移动滑块的时候把背景文案置为空
  dragTextContent.value = ''
  const touch = e.targetTouches[0]
  moving.value = true
  const offsetLeft = dragContainer.value.getBoundingClientRect().left
  // 获取滑动值和可滑动值中小的那一个
  const left = Math.min(touch.clientX - offsetLeft, maxHandlerOffset)
  // 如果滑到底
  if (left === maxHandlerOffset) {
    sucess()
  } else {
    dragHandler.value.style.left = left + 'px'
    dragBg.value.style.width = left + 50 + 'px'
  }
}
const onDragHandlerTouchEnd = (e:any) => {
  // 如果没有滑到底  就将滑块重置
  if (!isSucess.value) {
    dragTextContent.value = DEFAULTTEXT
    dragHandler.value.style.left = 0
    dragBg.value.style.width = 0
    moving.value = false
  }
}
</script>

<style lang="scss" setup>
.drag-container-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 滑动控件容器,灰色背景 */
.drag-container {
  position: relative;
  display: inline-block;
  background: #e8e8e8;
  width: 638px;
  height: 88px;
  border: 2px solid #d4d5da;
  border-radius: 16px;
}

/* 滑块左边部分,绿色背景 */
.drag-bg {
  position: absolute;
  background-color: #e9fdeb;
  width: 0;
  height: 100%;
  border-radius: 16px;
}

/* 滑动验证容器文本 */
.drag-text {
  position: absolute;
  width: 100%;
  height: 100%;

  /* 文字水平居中 */
  text-align: center;

  /* 文字垂直居中,这里不能用百分比,因为百分比是相对原始line-height的,而非div高度 */
  line-height: 88px;

  /* 文本不允许选中 */
  user-select: none;
}

/* 滑块 */
.drag-handler {
  position: absolute;
  width: 100px;
  height: 100%;
  cursor: move;
  border-radius: 16px;
}

/* 滑块初始背景 */
.dragHandlerBg {
  background: #fff no-repeat center url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==');
}

/* 验证成功时的滑块背景 有√ */
.dragHandlerOkBg {
  background: #fff no-repeat center url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==');
}
.moving {
  border: 2px solid #29cc60;
}
</style>