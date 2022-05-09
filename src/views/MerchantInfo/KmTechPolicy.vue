<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const handleBack = () => {
    router.replace('/merchantInfo')
  }
</script>

<template>
  <div class="merchantInfo-wrap">
    这是详情
    <div class="merchantInfo-back">
      <van-button type="default" @click="handleBack">返回</van-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .merchantInfo-back {
    padding: 24px 32px;
    background-color: #fff;
    .van-button {
      width: 100%;
      background-color: $bg-light-color-1;
    }
  }
</style>
