<template>
  <div id="kmtechPolicy-wrap">
    <iframe
      id="bdIframe"
      src="https://www.wjx.cn/vj/QDNYSwE.aspx"
      frameborder="0"
      width="100%"
      height="100%"></iframe>
  </div>
  <back-btn @click="goBack"></back-btn>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import BackBtn from '@/components/BackBtn/BackBtn.vue'
  import router from '@/router'
  export default defineComponent({
    components: {BackBtn},
    methods: {
      goBack() {
        router.replace('myWallet')
      }
    }
  })
</script>
<style lang="scss" scoped>
  #kmtechPolicy-wrap {
    height: calc(100% - 170px);
    box-sizing: border-box;
  }
</style>
