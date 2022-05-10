<template>
  <div>
    {{ a }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  console.log(route.params, 'route')
  const a = ref('BillDetail')
</script>
