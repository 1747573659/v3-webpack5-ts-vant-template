<template>
  <div id="kmtechPolicy-wrap">
    <iframe
      id="bdIframe"
      src="https://docs.qq.com/doc/DWUlUUU9nT0l3TURu"
      frameborder="0"
      width="100%"
      :height="iframeHeight"></iframe>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    // 已启用类型推断
    data(): { iframeHeight: string } {
      return {
        iframeHeight: '400'
      }
    },
    mounted() {
      const oWrap = document.getElementById('kmtechPolicy-wrap')
      if (oWrap) {
        console.log(oWrap.offsetHeight + 'px')
        this.iframeHeight = oWrap.offsetHeight - 10 + 'px'
      }
    }
  })
</script>
<style lang="scss" scoped>
  #kmtechPolicy-wrap {
    height: 100%;
  }
</style>
