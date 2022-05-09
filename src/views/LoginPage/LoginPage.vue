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
        <div class="shop-name">欢迎来到企业钱包</div>
      </div>
    </div>
    <div class="login-name">
      <login-box v-model="loginName" :errorMsg="errorMsg"></login-box>
    </div>
    <div class="login-btn">
      <large-button type="primary" @click="handleLogin" size="large"></large-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import shopImgDefault from '../../assets/img/shopImgDefault.png'
import { watch, ref } from 'vue'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
import LoginBox from './components/LoginBox/LoginBox.vue'
// import { onMounted } from '@vue/runtime-core'
// import { useStore } from 'vuex'

// import { Login } from '@/api/wallet'

// onMounted(() => {})
const shopImg = ref(shopImgDefault)
const loginName = ref('')

const errorMsg = ref('')

// 登录事件
const handleLogin = () => {
  console.log('login')
  console.log(loginName.value)
  errorMsg.value = '该号码尚未注册，请核实后重新输入'
}

// 清空错误信息
watch(loginName, (newValue:string, oldValue:string) => {
  if (newValue !== oldValue) {
    errorMsg.value = ''
  }
})
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
    margin-top: 84px;
    height: 111px;
  }
  .login-btn {
    margin-top: 176px;
    padding: 0 32px;
  }
}
</style>
