<script lang="ts" setup>
  import { reactive, ref, Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import moment from 'moment'
  import DatePickerAction from '@/components/DatePickerAction/DatePickerAction'
  import { formatYuanAmount } from '@/utils/formateMoney'
  import { queryBillStatement, queryBillAmount } from '@/api/wallet'
  import { billTypeMapEnum } from '@/enum/billStatement'
  import { BillAmountRep, billStatementReq } from '@/api/types'
  type tableList = {
    id: number
    transactionType: number | string
    amount: number
    category: number // 收支类别 1-收入； 2-支出
    transactionSuccessTime: string
    shopAdminName: string
  }
  const router = useRouter()

  const dateRange: Ref<string[]> = ref([
    moment().format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD')
  ])
  let totalAmount: BillAmountRep = reactive({
    expenditureAmount: null,
    incomeAmount: null
  })
  let tableLoading: ReturnType<typeof ref> = ref(false)
  let billList: { list: tableList[]; tableFinished: boolean } = reactive({
    list: [],
    tableFinished: false
  })
  let pageConfig = reactive({
    page: 1,
    rows: 20
  })
  let loadBillStatement = async (init?: boolean, data?: any) => {
    console.log('加载数据', init, data)
    tableLoading.value = true
    if (init) {
      pageConfig.page = 1
      billList.list = []
      billList.tableFinished = false
    }
    let params: billStatementReq = {
      page: pageConfig.page,
      rows: pageConfig.rows,
      walletId: 'QB0065757391780',
      transactionType: billTypeMapEnum.get(activeBillType.value).key,
      startTime: moment(dateRange.value[0]).format('YYYY-MM-DD 00:00:00'),
      endTime: moment(dateRange.value[1]).format('YYYY-MM-DD 23:59:59')
    }
    data && (params = Object.assign(params, { ...data }))
    console.log(params, 'params')
    return Promise.all([queryBillStatement(params), queryBillAmount(params)])
      .then(res => {
        billList.list = billList.list.concat(res[0].results || [])
        billList.tableFinished = !res[0].results || res[0].results.length < pageConfig.rows
        totalAmount.expenditureAmount = res[1].expenditureAmount
        totalAmount.incomeAmount = res[1].incomeAmount
        tableLoading.value = false
        pageConfig.page += 1
      })
      .catch(() => {
        billList.tableFinished = true
        tableLoading.value = false
        return Promise.reject()
      })
  }

  const showSelectTypeDialog = ref(false)
  let activeBillType: Ref<string | number> = ref('')
  // 账单类型变化
  const handleChangeActiveType = (key: string | number) => {
    console.log(key, 'key_value')
    showSelectTypeDialog.value = false
    if (activeBillType.value !== key) {
      loadBillStatement(true, {
        transactionType: key
      }).then(() => (activeBillType.value = key))
    }
  }
  const handleTimeChange = (time: string[]) => {
    const startTime = moment(time[0]).format('YYYY-MM-DD 00:00:00')
    const endTime = moment(time[1]).format('YYYY-MM-DD 23:59:59')
    return loadBillStatement(true, {
      startTime,
      endTime
    }).then(() => {
      console.log('then')
      dateRange.value = time
    })
  }
</script>
<template>
  <div class="billstate-wrap">
    <div class="billstate-header">
      <div class="billstate-title-wrap">
        <div class="left" @click="showSelectTypeDialog = true">
          <span>{{ billTypeMapEnum.get(activeBillType).label }}</span>
          <img src="../../assets/img/vector.png" />
        </div>
        <DatePickerAction :confirm="handleTimeChange" />
      </div>
      <div class="billstate-amount-wrap">
        <div class="billstate-amount-item">
          支出：￥ {{ formatYuanAmount(totalAmount.expenditureAmount || 0) }}
        </div>
        <div class="billstate-amount-item">
          收入：￥ {{ formatYuanAmount(totalAmount.incomeAmount || 0) }}
        </div>
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
        @click="
          router.push({
            name: 'billDetail',
            query: {
              transactionNo: item.transactionNo,
              categoryType: item.category,
              transactionType: item.transactionType
            }
          })
        ">
        <div class="billstate-main-item">
          <img :src="billTypeMapEnum.get(item.transactionType).src" alt="" />
          <div class="detail">
            <div class="title">
              {{ billTypeMapEnum.get(item.transactionType).label
              }}{{ item.shopAdminName ? `-${item.shopAdminName}` : '' }}
            </div>
            <div class="time">{{ item.transactionSuccessTime }}</div>
          </div>
          <div :class="{ amount: true, isAdd: item.category === 1 }">
            {{ item.category === 1 ? '+' : '-' }}{{ formatYuanAmount(item.amount || 0) }}
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
  <van-action-sheet v-model:show="showSelectTypeDialog" title="选择账单类型">
    <div class="billstate-type-wrap">
      <div
        :class="{ 'billstate-type-item': true, active: item[1].key === activeBillType }"
        v-for="item in billTypeMapEnum"
        :key="item[1].id"
        @click="handleChangeActiveType(item[0])">
        {{ item[1].label }}
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

  .billstate-main-wrap {
    flex: 1 1 200px;
    overflow-y: auto;
  }
  .billstate-title-wrap {
    padding: 32px 24px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
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
    .right {
      float: right;
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
      padding-right: 20px;
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
    font-size: 32px;
  }
  .billstate-type-item {
    width: 218px;
    height: 120px;
    margin-top: 20px;
    line-height: 120px;
    background-color: $bg-light-color-1;
    color: $font-color-3;
    text-align: center;
    border-radius: 8px;
    &.active {
      background-color: $primaryColor;
      color: #fff;
    }
  }
</style>
