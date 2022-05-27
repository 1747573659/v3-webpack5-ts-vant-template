<template>
  <Button v-bind="$attrs" size="large">
    <slot></slot>
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'vant'
</script>

<style scoped>
.van-button--large {
  border-radius: 10px;
  height: 96px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
}
</style>