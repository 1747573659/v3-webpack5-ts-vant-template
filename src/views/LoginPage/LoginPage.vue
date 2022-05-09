<template>
  <div class="login-wrap">
    <div class="shop-info">
      <div class="shop-img">
        <img class="img" :src="shopImg" alt="商家图片">
      </div>
      <div class="shop-content">
        <div class="shop-name">商户名</div>
        <div class="shop-name">欢迎来到企业钱包</div>
      </div>
    </div>
    <div class="login-name">
      <Field v-model="loginName" label="" placeholder="请输入用户名" />
    </div>
    <div class="login-btn"></div>
  </div>
</template>

<script lang="ts" setup>
import shopImgDefault from '../../assets/img/shopImgDefault.png'
import { reactive, ref } from '@vue/reactivity'
import { Field } from 'vant';
// import { onMounted } from '@vue/runtime-core'
// import { useStore } from 'vuex'

// import { Login } from '@/api/wallet'

// onMounted(() => {})
const shopImg = reactive(shopImgDefault)
const loginName = ref<string>('')
</script>

<style lang="scss" scoped>
.login-wrap {
  .shop-info {
    height: 300px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    .shop-img {
      width: 120px;
      height: 120px;
      .img {
        width: 120px;
        height: 120px;
      }
    }
    .shop-content {
      font-size: 40px;
      text-align: left;
      padding-left: 20px;
    }
  }
  .login-name {
    padding-top: 84px;
    height: 111px;
  }
}
</style>
