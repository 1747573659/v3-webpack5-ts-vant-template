<template>
  <div class="account-info">
    <div class="desc">到账银行卡</div>
    <div class="card-info">
      <div class="card-num">张三（6000 0000 0000 0000 888）</div>
      <div class="bank-location">中国农业银行股份有限公司电白电城支行</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.account-info {
  padding: 21px 48px 40px;
  .desc {
    font-weight: 500;
    font-size: 28px;
    color: $font-color-3;
    padding-bottom: 32px;
    line-height: 34px;
  }
  .card-info {
    .card-num {
      font-weight: 500;
      font-size: 36px;
      color: $font-color-1;
      padding-bottom: 10px;
      line-height: 48px;
    }
    .bank-location {
      font-weight: 400;
      font-size: 24px;
      color: $font-color-2;
      line-height: 34px;
    }
  }
}
</style>