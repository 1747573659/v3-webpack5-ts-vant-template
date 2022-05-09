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
      <Field
        :class="{'active-border': loginNameShowBorder}"
        @focus="loginNameFocus"
        placeholder="手机号码/钱包ID/法人身份证号"
        v-model="loginName"
        :clearable="true"
      />
    </div>
    <div class="login-btn">
      <Large-button type="primary" size="large"></Large-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import shopImgDefault from '../../assets/img/shopImgDefault.png'
import { ref } from '@vue/reactivity'
import { Field } from 'vant'
import LargeButton from '@/components/LargeButton/LargeButton.vue'
// import { onMounted } from '@vue/runtime-core'
// import { useStore } from 'vuex'

// import { Login } from '@/api/wallet'

// onMounted(() => {})
const shopImg = ref(shopImgDefault)
const loginName = ref<string>('')

const loginNameShowBorder = ref<boolean>(false)
const loginNameFocus = () => {
  loginNameShowBorder.value = true
}
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
    &:deep(.van-field__control) {
      border-bottom: solid 1px $borderColor;
    }
  }
  .active-border {
    &:deep(.van-field__control) {
      border-bottom: solid 1px $primaryColor;
    }
  }
  .login-btn {
    margin-top: 176px;
    padding: 0 32px;
  }
}
</style>
