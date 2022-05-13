<template>
  <div class="withdraw-box">
    <div class="title">提现金额</div>
    <div class="money">
      <div class="unit">¥</div>
      <div class="input">
        <van-field ref="input" v-model="moneyInner" type="number" @blur="moneyBlur" :placeholder="placeholder"/>
        <div class="tag-wrap" v-show="tag">
          <div class="tag">
            {{tag}}
          </div>
          <div class="tag-arrow"></div>
        </div>
      </div>
      <div class="allin-btn">
        <van-button size="mini" type="primary" @click="allinWithdraw">全部提现</van-button>
      </div>
    </div>
    <div class="info">
      <div class="remain-amount">
        <span>交易户余额 ¥{{amount}}</span>
        <tool-tip class="tooltip-wallet"></tool-tip>
      </div>
      <div class="tips">
        温馨提示：微信仅支持交易户提现，<span class="special">充值户(余额 ¥10.00)</span>请登录支付宝网商小程序操作
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import { onMounted } from 'vue';
import { Money } from '../../types'
import ToolTip from '@/components/ToolTip/ToolTip.vue'

onMounted(() => {
  input.value.focus()
})

const props = defineProps<{
  money: Money
}>()
const emits = defineEmits<{
  (e: 'update:money', moneyInner): void
}>()
const { money } = toRefs(props)
const moneyInner = computed<Money>({
  get: () => money.value,
  set: (value) => {
    emits('update:money', value)
  }
})

const input = ref()

const amount = ref(8000)

const placeholder = computed(() => `最多可转出¥${amount.value}`)

const tagArr = [null, '个', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'] 

const tag = computed(() => tagArr[String(moneyInner.value).split('.')[0].length])

const moneyBlur = () => {
  moneyInner.value = Math.min(Number(moneyInner.value), amount.value) || ''
}

const allinWithdraw = () => {
  moneyInner.value = amount.value
}
</script>

<style lang="scss" scoped>
.withdraw-box {
  height: 375px;
  background-color: $white;
  margin: 0 24px;
  border-radius: 20px;
  padding: 40px 24px;
  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
    color: $font-color-3;
  }
  .money {
    display: flex;
    align-items: flex-end;
    height: 142px;
    padding-bottom: 32px;
    border-bottom: 1px solid $border-split-color-1;
    .unit {
      font-weight: 500;
      font-size: 50px;
      color: $font-color-1;
      line-height: 50px;
      padding-bottom: 2px;
    }
    .input {
      position: relative;
      .tag-wrap {
        position: absolute;
        left: 30px;
        top: -30px;
        background: $bg-light-color-1;
        padding: 5px 7.5px;
        .tag {
          font-weight: 500;
          font-size: 20px;
          color: $font-color-3;
        }
        .tag-arrow {
          border-width: 10px;
          filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          bottom: -8px;
          left: 50%;
          transform: translate(-50%);
          margin-right: 3px;
          border-top-color: $bg-light-color-1;
          border-bottom-width: 0;
        }
        .tag-arrow::after {
          bottom: 1px;
          margin-left: -6px;
          border-top-color: $bg-light-color-1;
          border-bottom-width: 0;
          content: ' ';
          /* stylelint-disable-next-line declaration-block-no-shorthand-property-overrides */
          border-width: 6px;
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          /* stylelint-disable-next-line declaration-block-no-shorthand-property-overrides */
          border-color: transparent;
          border-style: solid;
        }
      }
      &:deep(.van-cell) {
        padding: 0 0 0 24px;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color: $midColorPlaceholder;
        font-weight: 400;
        font-size: 30px;
        line-height: 34px;
      }
      &:deep(.van-field__control) {
        caret-color: $primaryColor;
        font-weight: 500;
        font-size: 70px;
        line-height: 68px;
      }
    }
    .allin-btn {
      min-width: 138px;
      height: 48px;
      &:deep(.van-button) {
        min-width: 138px;
        height: 48px;
        border-radius: 70px;
        background: $bg-light-color-1;
        border: none;
        .van-button__text {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 36px;
          color: $primaryColor;
        }
      }
    }
  }
  .info {
    height: 140px;
    padding-top: 32px;
    .remain-amount {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 28px;
      line-height: 40px;
      color: $font-color-3;
      display: flex;
      align-items: center;
      .tooltip-walle {
        margin-left: 8px;
      }
    }
    .tips {
      padding-top: 27px;
      vertical-align: middle;
      height: 76px;
      line-height: 38px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      color: $font-color-2;
      .special {
        color: $font-color-1;
      }
    }
  }
}
</style>