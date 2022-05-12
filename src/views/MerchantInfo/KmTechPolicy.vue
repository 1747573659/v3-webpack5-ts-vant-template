<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const handleBack = () => {
    router.replace('/merchantInfo')
  }
</script>

<template>
  <div class="kmtechPolicy-wrap">
    <div class="kmtechPolicy-main-wrap">这是详情</div>
    <!-- <div class="kmtechPolicy-back">
      <van-button type="default" @click="handleBack">返回</van-button>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
  .kmtechPolicy-wrap {
    height: 100%;
    background-color: $bg-light-color-1;
  }
  .kmtechPolicy-main-wrap {
    height: 100%;
  }
  .kmtechPolicy-back {
    padding: 24px 32px;
    box-sizing: border-box;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100vw;
    .van-button {
      width: 100%;
      background-color: $bg-light-color-1;
    }
  }
</style>
