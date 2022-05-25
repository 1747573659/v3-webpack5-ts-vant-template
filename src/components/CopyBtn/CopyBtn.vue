<template>
  <van-button @click="copy" class="copy-btn" round size="mini" type="primary">复制</van-button>
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

<style scoped lang="scss">
.copy-btn {
  width: 100px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  border: none;
  border-radius: 70px;
  background-color: rgba(0, 0, 0, .2);

  @include themify {
    color: themed('copyBtnColor');
  }
}
</style>