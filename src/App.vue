<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive max="5">
      <component
        :is="Component"
        :key="route.meta.keepAlive"
      />
    </keep-alive>
  </router-view>

  <!-- 每小时发送五次后会调用一个滑动验证组件 -->
  <!-- 需要在发送短的接口去调用一个获取是否到达五次的接口 -->
  <!-- 登录和提现共用 -->
  <resend-confirm></resend-confirm>
  <!-- 在需要显示backBtn的页面显示，通过路由的showBackBtn进行设置 -->
  <app-back-btn></app-back-btn>
</template>

<script lang="ts" setup>
import ResendConfirm from '@/components/MsgVerify/ResendConfirm.vue'
import AppBackBtn from '@/components/AppBackBtn/AppBackBtn.vue'
</script>

<style lang="scss">
</style>
