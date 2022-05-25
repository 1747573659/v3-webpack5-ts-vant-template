<template>
  <back-btn v-if="showBackBtn" @click="appBackBtnClick"></back-btn>
</template>

<script lang="ts" setup>
import BackBtn from '@/components/BackBtn/BackBtn.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showBackBtn = ref(false)
const router = useRouter()
router.beforeEach((to, from, next) => {
  showBackBtn.value = to.meta.showBackBtn as boolean || false
  next()
})
const appBackBtnClick = () => {
  router.back()
}
</script>