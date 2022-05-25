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
  border-radius: 20px !important;
  height: 96px;
}
</style>