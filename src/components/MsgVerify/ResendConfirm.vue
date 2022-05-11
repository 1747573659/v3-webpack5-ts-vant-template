<template>
  <Popup v-model:show="show" position="right" :style="{ width: '100%', height: '100%' }" >
    <div class="confirm-text">请完成安全校验</div>
    <slide-bar @sucess="sucess"></slide-bar>
  </Popup>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { Popup } from 'vant'
import SlideBar from '@/components/SlideBar/SlideBar.vue'

const prop = defineProps<{
  show: boolean
}>()
const { show } = toRefs(prop)

const emit = defineEmits<{
  (e: 'sucess'): void
}>()

// 验证成功
const sucess = () => {
  emit('sucess')
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