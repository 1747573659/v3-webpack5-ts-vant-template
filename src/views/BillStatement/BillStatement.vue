<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { queryBillStatement } from '@/api/wallet'
  import { BillAmountRep } from '@/api/types'
  const router = useRouter()
  const billTypeEnum = {
    recharge: {
      key: 'recharge',
      label: '充值',
      isAdd: true,
      src: require('../../assets/img/recharge.png')
    },
    deposit: {
      key: 'deposit',
      label: '提现',
      isAdd: false,
      src: require('../../assets/img/deposit.png')
    },
    transfer: {
      key: 'transfer',
      label: '转账',
      isAdd: false,
      src: require('../../assets/img/transfer.png')
    },
    payment: {
      key: 'payment',
      label: '小程序支付',
      isAdd: false,
      src: require('../../assets/img/payment.png')
    },
    refund: {
      key: 'refund',
      label: '小程序退款',
      isAdd: true,
      src: require('../../assets/img/refund.png')
    }
  }
  let totalAmount: BillAmountRep = reactive({
    expend: null,
    income: null
  })
  let tableLoading: ReturnType<typeof ref> = ref(false)
  // let tableFinished: ReturnType<typeof ref> = ref(false)
  let billList = reactive({
    list: [],
    tableFinished: false
  })
  let pageConfig = reactive({
    page: 1,
    size: false
  })
  let loadBillStatement = () => {
    console.log('数据加载了。。。')
    tableLoading.value = true
    // MYTODO: 模拟数据
    new Promise(res => {
      setTimeout(() => {
        res([])
      }, 1000)
    })
      .then(() => {
        const mockList = [
          {
            id: 1,
            type: 'recharge',
            amount: 5005432,
            time: '2022-01 12:00:00',
            shopName: '商户名称商户名称商户名称商户名称商户名'
          },
          {
            id: 2,
            type: 'recharge',
            amount: 800,
            time: '2022-01 12:00:00',
            shopName: '商户名称'
          },
          {
            id: 2,
            type: 'deposit',
            amount: 500,
            time: '2022-01 12:00:00',
            shopName: '商户名称'
          }
        ]
        billList.list = billList.list.concat(mockList)
        billList.tableFinished = !!(mockList.length && mockList.length < 2)
        pageConfig.page += 1
      })
      .finally(() => {
        tableLoading.value = false
      })

    // loadBillStatement({ page: pageConfig.page, size: pageConfig.size }).then(res => {
    //   totalAmount.expend = res.expend
    //   totalAmount.income = res.income
    //   billList.list = res.results
    //   billList.tableFinished = !!(res.results.length && res.results.length > pageConfig.size)
    //   pageConfig.page += 1
    // }).finally(() => {
    //   tableLoading.value = false
    // })
  }
</script>
<template>
  <div class="billstate-wrap">
    <div class="billstate-title-wrap">
      <div class="left">
        <span>全部账单</span>
        <img src="../../assets/img/vector.png" />
      </div>
      <!-- <div class="right">今日</div> -->
    </div>
    <div class="billstate-amount-wrap">
      <span>支出：￥ {{ totalAmount.expend }}</span>
      <span>收入：￥ {{ totalAmount.income }}</span>
    </div>
    <van-list
      v-model:loading="tableLoading"
      class="billstate-main-wrap"
      :finished="billList.tableFinished"
      finished-text="没有更多了"
      @load="loadBillStatement">
      <van-cell
        v-for="item in billList.list"
        :key="item.id"
        @click="router.push(`/billDetail/${item.id}`)">
        <div class="billstate-main-item">
          <img :src="billTypeEnum[item.type].src" alt="" />
          <div>
            <div class="title">
              {{ billTypeEnum[item.type].label }}{{ item.shopName ? `-${item.shopName}` : '' }}
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
          <div :class="{ amount: true, isAdd: billTypeEnum[item.type].isAdd }">
            {{ billTypeEnum[item.type].isAdd ? '+' : '-' }}{{ item.amount }}
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
  .billstate-wrap {
    text-align: left;
  }
  .billstate-title-wrap {
    padding: 32px 24px;
    .left {
      height: 44px;
      line-height: 44px;
      vertical-align: middle;
      > span {
        color: $font-color-4;
        font-weight: 500;
        font-size: 36px;
        font-family: PingFang SC;
      }
      img {
        width: 44px;
        display: inline-block;
      }
    }
  }
  .billstate-amount-wrap {
    height: 87px;
    line-height: 87px;
    padding: 0 24px;
    background-color: $bg-light-color-1;
  }

  .billstate-main-item {
    display: flex;
    align-items: center;
    .van-list {
      :deep(.van-cell) {
        padding: 36px 24px;
      }
    }
    img {
      width: 72px;
      margin-right: 24px;
      flex: 0 0 auto;
    }
    .title {
      font-size: 32px;
      font-weight: 500;
      color: $font-color-1;
      width: 300px;
      line-height: 48px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      color: $font-color-2;
      font-size: 24px;
    }
    .amount {
      flex: 1 1 300px;
      text-align: right;
      color: $font-color-1;
      font-size: 40px;
      &.isAdd {
        color: $warnColor;
      }
    }
  }
</style>
