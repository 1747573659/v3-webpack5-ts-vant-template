<template>
  <div class="back-btn-wrap" v-if="!keyBoardShow">
    <large-button class="back-btn" v-model:color="color" type="primary" size="large"><slot>返回</slot></large-button>
    <!-- 安全区适配 -->
    <div class="van-safe-area-bottom"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import useKeyBoardShowForPage from '@/hooks/useKeyBoardShowForPage'
const color = ref('')
// 安卓端键盘被调起时隐藏fixed元素
const { keyBoardShow } = useKeyBoardShowForPage()
</script>

<style lang="scss" scoped>
.back-btn-wrap {
  width: calc(100% - 64px);
  padding: 24px 32px;
  position: fixed;
  bottom: 0;
  background-color: white;
  .back-btn {
    background: #f0f3f5;
    border-radius: 10px;
    border: none;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    color: $font-color-1;
  }
}
</style>