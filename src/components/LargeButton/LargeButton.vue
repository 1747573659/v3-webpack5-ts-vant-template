<template>
  <Button type="primary" v-bind="$attrs" color="#00A3FF" size="large">
    <slot></slot>
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'vant'

</script>

<style scoped>
.van-button--large {
  border-radius: 10px !important;
  height: 96px;
}
</style>