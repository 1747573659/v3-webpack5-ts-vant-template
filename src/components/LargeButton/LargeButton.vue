<template>
  <Button v-bind="$attrs" :color="color" size="large">
    <slot></slot>
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'vant'
import { toRefs } from 'vue'
interface Props {
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: '#00A3FF'
})

const { color } = toRefs(props)
</script>

<style scoped>
.van-button--large {
  border-radius: 20px !important;
  height: 96px;
}
</style>