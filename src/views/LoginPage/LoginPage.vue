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
        <div class="shop-name">{{shopShortNameRef}}</div>
      </div>
    </div>
    <!-- input phoneNum -->
    <login-for-phone-num v-if="!hasInputedLoginName" @login-sucess="LoginSucess"></login-for-phone-num>
    <!-- input VerifyCode -->
    <login-for-verify :loginData="LoginData" v-if="hasInputedLoginName"></login-for-verify>
    <!-- 返回 -->
    <back-btn v-if="hasInputedLoginName" @click="back()"></back-btn>
    <div v-if="!hasInputedLoginName" class="bot-info">科脉享多多技术提供</div>
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

const store = useStore()

const { shopShortName, loginLogoUrl } = store.state.userInfo

const shopShortNameRef = ref(shopShortName)

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
.bot-info {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 39px;
  color: $font-color-2;
  text-align: center;
  position: fixed;
  bottom: 24px;
  width: 100%;
}
</style>
