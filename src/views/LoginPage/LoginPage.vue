<template>
  <div class="login-size">{{ store.state.userInfo.token }}</div>
</template>

<script lang="ts" setup>
// import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useStore } from "vuex"

import {
  Login
} from '@/api/wallet'

const store = useStore()

const handleLogin = async () => {
  const res = await Login({
    loginName: 'admin',
    password: '21218cca77804d2ba1922c33e0151105'
  })
  console.log(store)
  store.commit('SET_TOKEN', res.data.token)
}

onMounted(() => {
  handleLogin()
})

</script>

<style lang="scss">
.login-size {
  font-size: 50px;
}
</style>
