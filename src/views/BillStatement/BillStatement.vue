<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { queryBillStatement } from '@/api/wallet'
  import { billTypeEnum } from '@/enum/billStatement'
  import { BillAmountRep } from '@/api/types'
  type tableList = {
    id: number
    type: string
    amount: number
    time: string
    shopName: string
  }
  const router = useRouter()

  let totalAmount: BillAmountRep = reactive({
    expend: null,
    income: null
  })
  let tableLoading: ReturnType<typeof ref> = ref(false)
  let billList: { list: tableList[]; tableFinished: boolean } = reactive({
    list: [],
    tableFinished: false
  })
  let pageConfig = reactive({
    page: 1,
    size: false
  })
  let loadBillStatement = (init?: boolean) => {
    tableLoading.value = true
    if (init) {
      pageConfig.page = 1
      billList.list = []
      billList.tableFinished = false
    }
    // MYTODO: 模拟数据
    new Promise(res => {
      setTimeout(() => {
        res([])
      }, 1000)
    })
      .then(() => {
        const mockList: tableList[] = [
          {
            id: 1,
            type: 'recharge',
            amount: 5005437562,
            time: '2022-01 12:00:00',
            shopName: '商户名称商户名称商户名称商户名称商户名'
          },
          {
            id: 2,
            type: 'recharge',
            amount: 8776548799943543,
            time: '2022-01 12:00:00',
            shopName: '商户名d的的称呼'
          },
          {
            id: 2,
            type: 'deposit',
            amount: 500,
            time: '2022-01 12:00:00',
            shopName: '商户名称商户名称商户名称商户名称商户名称测试长度'
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

  const showSelectTypeDialog = ref(false)
  let activeBillType: ReturnType<typeof ref> = ref('all')
  const handleChangeActiveType = (key: string) => {
    showSelectTypeDialog.value = false
    if (activeBillType.value !== key) {
      activeBillType.value = key
      loadBillStatement(true)
    }
  }
</script>
<template>
  <div class="billstate-wrap">
    <div class="billstate-header">
      <div class="billstate-title-wrap">
        <div class="left" @click="showSelectTypeDialog = true">
          <span>{{ billTypeEnum[activeBillType].label }}</span>
          <img src="../../assets/img/vector.png" />
        </div>
        <!-- <div class="right">今日</div> -->
      </div>
      <div class="billstate-amount-wrap">
        <div class="billstate-amount-item">支出：￥ {{ totalAmount.expend }}</div>
        <div class="billstate-amount-item">收入：￥ {{ totalAmount.income }}</div>
      </div>
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
          <div class="detail">
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
  <van-action-sheet v-model:show="showSelectTypeDialog" title="选择账单类型">
    <div class="billstate-type-wrap">
      <div
        :class="{ 'billstate-type-item': true, active: item.key === activeBillType }"
        v-for="item in billTypeEnum"
        :key="item.id"
        @click="handleChangeActiveType(item.key)">
        {{ item.label }}
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
  .billstate-wrap {
    text-align: left;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: $bg-light-color-1;
  }
  .billstate-header {
    // display: flex;
    // flex-direction: column;
  }
  .billstate-main-wrap {
    flex: 1 1 200px;
    overflow-y: auto;
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
      }
      img {
        width: 44px;
        display: inline-block;
      }
    }
  }
  .billstate-amount-wrap {
    line-height: 87px;
    padding: 0 24px;
    background-color: $bg-light-color-1;
    display: flex;
    flex-wrap: wrap;
    :first-child {
      margin-right: 40px;
    }
  }
  .billstate-amount-item {
    min-width: 200px;
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
      flex: 0;
    }
    .detail {
      flex: 1 1 auto;
      overflow: hidden;
    }
    .title {
      width: 100%;
      font-size: 32px;
      font-weight: 500;
      color: $font-color-1;
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
  .billstate-type-wrap {
    display: flex;
    min-height: 800px;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 100px;
    padding: 0 24px;
  }
  .billstate-type-item {
    width: 218px;
    height: 120px;
    margin-top: 20px;
    line-height: 120px;
    background-color: $bg-light-color-1;
    color: $font-color-3;
    &.active {
      background-color: $primaryColor;
      color: #fff;
    }
  }
</style>
