<template>
  <large-button class="logou-btn" color="" @click="logout">退出登录</large-button>
</template>

<script lang="ts" setup>
import LargeButton from '@/components/LargeButton/LargeButton.vue'

const logout = () => {
  console.log('退出登录')
}
</script>

<style lang="scss" scoped>
.logou-btn {
  font-weight: 400;
  font-size: 32px;
  color: #64676d;
}
</style>