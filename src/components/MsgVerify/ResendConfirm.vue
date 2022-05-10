<template>
  <Popup v-model:show="showInner" position="right" :style="{ width: '100%', height: '100%' }" >
    <slide-bar></slide-bar>
  </Popup>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { Popup } from 'vant'
import { computed } from '@vue/reactivity';
import SlideBar from '@/components/SlideBar/SlideBar.vue'

const prop = defineProps<{
  show: boolean
}>()
const { show } = toRefs(prop)
const showInner = computed(() => show.value)
</script>

<style lang="scss" scoped></style>