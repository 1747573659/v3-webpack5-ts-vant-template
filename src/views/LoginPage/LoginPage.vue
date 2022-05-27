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
        <div class="shop-name">{{welcomeMessageRef}}</div>
      </div>
    </div>
    <!-- input phoneNum -->
    <login-for-phone-num v-if="!hasInputedLoginName" @login-sucess="LoginSucess"></login-for-phone-num>
    <!-- input VerifyCode -->
    <login-for-verify :loginData="LoginData" v-if="hasInputedLoginName"></login-for-verify>
    <!-- 返回 -->
    <back-btn v-if="hasInputedLoginName" @click="back()"></back-btn>
    <div v-if="!hasInputedLoginName && !keyBoardShow" class="bot-info">
      科脉享多多技术提供
      <!-- 安全区适配 -->
      <div class="van-safe-area-bottom"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import shopImgDefault from '../../assets/img/shopImgDefault.png'
import { reactive, ref } from 'vue'
// input phoneNum
import LoginForPhoneNum from './components/LoginForPhoneNum/LoginForPhoneNum.vue'
// input VerifyCode
import LoginForVerify from './components/LoginForVerify/LoginForVerify.vue'

import BackBtn from '@/components/BackBtn/BackBtn.vue'

import { useStore } from 'vuex'
import { LoginReq } from '@/api/types'
import useKeyBoardShowForPage from '@/hooks/useKeyBoardShowForPage'
// 安卓端键盘被调起时隐藏fixed元素
const { keyBoardShow } = useKeyBoardShowForPage()
const store = useStore()

const { welcomeMessage, loginLogoUrl } = store.state.userInfo

const welcomeMessageRef = ref(welcomeMessage)

// 定义图片
const shopImg = ref(loginLogoUrl || shopImgDefault)

const LoginData = reactive<LoginReq>({
  loginItem: '',
  loginItemType: 0,
  openId: '',
  shopAdminId: 0
})

// 是否已输入phoneNum
const hasInputedLoginName = ref(false)
// 登录成功
const LoginSucess = (data: LoginReq) => {
  hasInputedLoginName.value = true
  Object.assign(LoginData, data)
}

const back = () => {
  store.dispatch('resetUserInfo')
  hasInputedLoginName.value = false
}

</script>

<style lang="scss" scoped>
.login-wrap {
  height: 100%;
  background-color: $white;
  .shop-info {
    height: 224px;
    padding-left: 40px;
    padding-top: 80px;
    .shop-img {
      display: inline-block;
      width: 120px;
      height: 120px;
      .img {
        width: 120px;
        height: 120px;
      }
    }
    .shop-content {
      display: inline-block;
      font-size: 40px;
      text-align: left;
      padding-left: 24px;
    }
  }
}
.bot-info {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 39px;
  position: fixed;
  bottom: 12px;
  color: $font-color-2;
  text-align: center;
  width: 100%;
}
</style>
