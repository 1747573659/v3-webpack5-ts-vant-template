<template>
  <div id="kmtechPolicy-wrap">
    <iframe
      id="bdIframe"
      src="https://file-sso.oss-cn-hangzhou.aliyuncs.com/front/legalNotices/privacyPolicy.html?wework_cfm_code=MtG2IP6hCO1gNQncB%2F32p3JCSfV9M1saE1SYeOdKG%2FFOVJ4cicm7zFDkZplrJdc4Inkw7q0r2Najl%2FEQL8FIknrT7v%2B3hZsIOLElPmXomrCz5ebgtbHZ9%2BsxPcksouGdJyl%2B6UUoO6rN1AssTmqmt0Z0reon6tklwQ%3D%3D"
      frameborder="0"
      width="100%"
      :height="iframeHeight"></iframe>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const iframeHeight = ref('400px')

onMounted(() => {
  const oWrap = document.getElementById('kmtechPolicy-wrap')
  if (oWrap) {
    iframeHeight.value = oWrap.offsetHeight - 10 + 'px'
  }
})
</script>
<style lang="scss" scoped>
  #kmtechPolicy-wrap {
    height: 100%;
  }
</style>
