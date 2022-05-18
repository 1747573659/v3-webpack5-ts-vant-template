<template>
  <router-view />
  <!-- 每小时发送五次后会调用一个滑动验证组件 -->
  <!-- 需要在发送短的接口去调用一个获取是否到达五次的接口 -->
  <!-- 登录和提现共用 -->
  <resend-confirm :show="showSliderBar" @sucess="confirmSucess"></resend-confirm>
</template>

<script lang="ts" setup>
import ResendConfirm from '@/components/MsgVerify/ResendConfirm.vue'
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const showSliderBar = computed(() => store.state.showSliderBar.showSliderBar)
const confirmSucess = () => {
  store.dispatch('setShowSliderBar', false)
}

</script>

<style lang="scss">
</style>
