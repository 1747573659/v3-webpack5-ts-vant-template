<template>
  <div class="login-wrap">
    <div class="shop-info">
      <div class="shop-img">
        <img
          :src="shopImg"
          alt="商家图片"
          class="img"
        />
      </div>
      <div class="shop-content">
        <div class="shop-name">商户名</div>
      </div>
    </div>
    <!-- input phoneNum -->
    <login-for-phone-num v-if="!hasInputedLoginName" @login-sucess="LoginSucess"></login-for-phone-num>
    <!-- input VerifyCode -->
    <login-for-verify v-if="hasInputedLoginName"></login-for-verify>
  </div>
</template>

<script lang="ts" setup>
import shopImgDefault from '../../assets/img/shopImgDefault.png'
import { ref } from 'vue'
// input phoneNum
import LoginForPhoneNum from './components/LoginForPhoneNum/LoginForPhoneNum.vue'
// input VerifyCode
import LoginForVerify from './components/LoginForVerify/LoginForVerify.vue'

// 定义图片
const shopImg = ref(shopImgDefault)

// 是否已输入phoneNum
const hasInputedLoginName = ref(false)
// 登录成功
const LoginSucess = (flag:boolean) => {
  hasInputedLoginName.value = flag
}

</script>

<style lang="scss" scoped>
.login-wrap {
  height: 100%;
  background-color: $white;
  .shop-info {
    height: 304px;
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
}
</style>
