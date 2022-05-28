<template>
  <div class="account-info">
    <div class="desc">到账银行卡</div>
    <div class="card-info">
      <div class="card-num">
        <template v-if="withdrawDetailInfo?.bankCard">
          <span class="span" v-if="withdrawDetailInfo?.accountName.length <= 4">{{withdrawDetailInfo?.accountName}} ({{crad}})</span>
          <div v-else>
            <div>{{withdrawDetailInfo?.accountName}}</div>
            <div>({{crad}})</div>
          </div>
        </template>
      </div>
      <div class="bank-location">{{withdrawDetailInfo?.openBankCnap}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useInjectInfo from '../../hooks/useInjectInfo'
const withdrawDetailInfo = useInjectInfo()

const crad = computed(() => String(withdrawDetailInfo?.bankCard).replace(/(\d{4})(?=\d)/g,'$1 '))
</script>

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
      min-height: 48px;
      .span {
        line-height: 48px;
      }
    }
    .bank-location {
      font-weight: 400;
      font-size: 24px;
      color: $font-color-2;
      line-height: 34px;
      min-height: 34px;
    }
  }
}
</style>