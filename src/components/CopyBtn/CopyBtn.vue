<template>
  <van-button @click="copy" class="copy-btn" color="#0089E5" round size="mini" type="primary">复制</van-button>
</template>

<script lang="ts" setup>
import { Toast } from 'vant'
import { toRefs } from 'vue'

const props = defineProps<{
  text: string
}>()

const { text } = toRefs(props)

const copy = () => {
  let input = document.createElement('input');
  input.value = text.value
  // input.style.display = 'none'
  document.body.appendChild(input)
  input.select();
  document.execCommand("Copy")
  input.remove()
  Toast.success('复制成功')
}
</script>

<style scoped>
.copy-btn {
  width: 100px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  color: $copyBtnColor;
}
</style>