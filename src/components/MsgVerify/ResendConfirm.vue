<template>
  <Popup v-model:show="show" position="right" :style="{ width: '100%', height: '100%' }" >
    <div class="confirm-text">请完成安全校验</div>
    <slide-bar @sucess="sucess"></slide-bar>
  </Popup>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Popup } from 'vant'
import SlideBar from '@/components/SlideBar/SlideBar.vue'
import { useStore } from 'vuex'
const store = useStore()
const show = computed(() => store.state.showSliderBar.showSliderBar)

// 验证成功
const sucess = () => {
  store.dispatch('setShowSliderBar', false)
}
</script>

<style lang="scss" scoped>
.confirm-text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  color: $font-color-1;
  margin: 123px 0 80px;
  text-align: center;
}
</style>