<template>
  <div>
    {{ a }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'

const a = ref('WithdrawConfig')
</script>
