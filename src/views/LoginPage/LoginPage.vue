<template>
  <div>{{ a }}</div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

import {
  Login
} from '@/api/wallet'

const handleLogin = async () => {
  const res = await Login({
    loginName: 'admin',
    password: '21218cca77804d2ba1922c33e0151105'
  })
}

onMounted(() => {
  handleLogin()
})

const a = ref('Login')
</script>
