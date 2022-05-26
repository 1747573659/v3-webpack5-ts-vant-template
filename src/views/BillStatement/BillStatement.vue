<script lang="ts" setup>
  import { onActivated, reactive, ref, Ref, nextTick } from 'vue'
  import { useRouter, onBeforeRouteLeave } from 'vue-router'
  import { useStore } from 'vuex'
  import moment from 'moment'
  import DatePickerAction from '@/components/DatePickerAction/DatePickerAction.vue'
  import { formatYuanAmount } from '@/utils/formateMoney'
  import { queryBillStatement, queryBillAmount } from '@/api/wallet'
  import { billTypeMapEnum } from '@/enum/billStatement'
  import { BillAmountRep, billStatementReq, TableList } from '@/api/types'

  const router = useRouter()
  const store = useStore()
  const scrollY = ref(0)
  onActivated(() => {
    nextTick(() => {
      const oWrap:any = document.getElementById('billstate-main-wrap')
      oWrap.scrollTop = scrollY.value || 0
    })
  })
  onBeforeRouteLeave((to, from ,next)=> {
    if (to.path === '/billDetail') {
      const oWrap = document.getElementById('billstate-main-wrap')
      scrollY.value = oWrap ? oWrap.scrollTop : 0
      store.dispatch('addCachedView', {name: 'billStatement'})
    } else {
      scrollY.value = 0
      store.dispatch('delCachedView', {name: 'billStatement'})
    }
    next()
  })
  let totalAmount: BillAmountRep = reactive({
    expenditureAmount: null,
    incomeAmount: null
  })
  const datePickerActionRef = ref()
  let tableLoading = ref(false)
  let billList: { list: TableList[]; tableFinished: boolean } = reactive({
    list: [],
    tableFinished: false
  })
  let pageConfig = reactive({
    page: 1,
    rows: 20
  })
  const pullRefreshLoading = ref(false)
  const getDate = () => {
    return datePickerActionRef.value.getTime()
  }
  const isLoading = ref(false)
  let loadBillStatement = async (init?: boolean, data?: any) => {
    if (isLoading.value) return
    isLoading.value = true
    tableLoading.value = true
    if (init) {
      pageConfig.page = 1
      billList.list = []
      billList.tableFinished = false
    }
    let params: billStatementReq = {
      page: pageConfig.page,
      rows: pageConfig.rows,
      walletId: store.state.userInfo.walletId,
      openId: store.state.userInfo.openId,
      transactionType: billTypeMapEnum.get(activeBillType.value).key,
      startTime: moment(getDate()[0]).format('YYYY-MM-DD 00:00:00'),
      endTime: moment(getDate()[1]).format('YYYY-MM-DD 23:59:59')
    }
    data && (params = Object.assign(params, { ...data }))
    return Promise.all([queryBillStatement(params), queryBillAmount(params)])
      .then(res => {
        billList.list = billList.list.concat(res[0].results || [])
        billList.tableFinished = !res[0].results || res[0].results.length < pageConfig.rows
        totalAmount.expenditureAmount = res[1].expenditureAmount
        totalAmount.incomeAmount = res[1].incomeAmount
        tableLoading.value = false
        pageConfig.page += 1
        isLoading.value = false
      })
      .catch(() => {
        billList.tableFinished = true
        tableLoading.value = false
        isLoading.value = false
        return Promise.reject()
      })
  }

  const showSelectTypeDialog = ref(false)
  let activeBillType: Ref<string | number> = ref('')
  // 账单类型变化
  const handleChangeActiveType = (key: string | number) => {
    showSelectTypeDialog.value = false
    if (activeBillType.value !== key) {
      loadBillStatement(true, {
        transactionType: key
      }).then(() => (activeBillType.value = key))
    }
  }
  const handleTimeChange = () => {
    return loadBillStatement(true)
  }
  const onRefresh = () => {
    pullRefreshLoading.value = true
    loadBillStatement(true).finally(() => {
      pullRefreshLoading.value = false
    })
  }
  
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'billStatement'
  })
</script>
<template>
  <div class="billstate-wrap">
    <div class="billstate-header">
      <div class="billstate-title-wrap">
        <div class="left" @click="showSelectTypeDialog = true">
          <span>{{ billTypeMapEnum.get(activeBillType).label }}</span>
          <img src="../../assets/img/vector.png" />
        </div>
        <DatePickerAction :confirm="handleTimeChange" ref="datePickerActionRef" />
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
    <van-pull-refresh v-model="pullRefreshLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="tableLoading"
        id="billstate-main-wrap"
        class="billstate-main-wrap"
        :finished="billList.tableFinished"
        :finished-text="billList.tableFinished && !billList.list ? '暂无数据' : '没有更多了'"
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
                }}{{ item.counterpartShortShopName ? `-${item.counterpartShortShopName}` : '' }}
              </div>
              <div class="time">{{ item.transactionSuccessTime }}</div>
            </div>
            <div :class="{ amount: true, isAdd: item.category === 1 }">
              {{ item.category === 1 ? '+' : '-' }}{{ formatYuanAmount(item.amount || 0) }}
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
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
    height: calc(100% - 160px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: $bg-light-color-1;
  }
  .billstate-main-wrap {
    height: 100%;
    box-sizing: border-box;
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
      color: #fff;

      @include themify {
        background-color: themed('primaryColor');
      }
    }
  }
  .van-pull-refresh {
    height: 100%;
    flex: 1 1 200px;
    :deep(.van-pull-refresh__track) {
      overflow-y: auto;
      height: 100%;
    }
  }
</style>
