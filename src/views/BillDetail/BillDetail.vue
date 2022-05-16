<template>
  <div class="billdetail-wrap">
    <div class="billdetail-header">
      <div class="billdetail-header-main">
        <img :src="currentItem.src" alt="" />
        <div class="billdetail-header-info">
          {{ currentItem.label }}{{ state.billDetail.name ? `-${state.billDetail.name}` : '' }}
        </div>
        <div class="billdetail-header-mount">
          {{ state.billDetail.category === 1 ? '+' : '-' }}{{ state.billDetail.amount }}
        </div>
      </div>
    </div>
    <div class="billdetail-main">
      <div class="billdetail-item" v-for="billItem in currentItem.detailList" :key="billItem.key">
        <div class="billdetail-item-left">
          {{ getLabel(billItem.label) }}
        </div>
        <div class="billdetail-item-right">
          {{ state.billDetail[billItem.key] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { queryBillDetails } from '@/api/wallet'
  import { billTypeMapEnum, getBillItemList, billDetailType } from '@/enum/billStatement'
  type billDetailQueryType = {
    categoryType: string
    transactionNo: string
    transactionType: string
    // orderType: any
    // [propName: string]: string | number
  }
  const route = useRoute()
  const state = reactive({
    queryData: route.query as billDetailQueryType,
    billDetail: {}
  })

  const getBillDetails = () => {
    queryBillDetails(state.queryData).then(res => {
      state.billDetail = res
    })
  }

  const getLabel = (label: (arg0: { [x: string]: string | number }) => string) => {
    if (typeof label === 'function') {
      return label(state.billDetail)
    } else {
      return label
    }
  }
  const currentItem = computed(() => {
    console.log(
      billTypeMapEnum.get(Number(state.queryData.transactionType)),
      state.queryData.transactionType,
      '详情项'
    )
    getBillItemList(state.billDetail)
    return billTypeMapEnum.get(Number(state.queryData.transactionType)) || {}
  })
  onMounted(() => {
    getBillDetails()
  })
</script>
<style lang="scss" scoped>
  .billdetail-wrap {
    // padding: 0 24px;
    background-color: #fafcff;
    height: 100%;
  }
  .billdetail-header {
    padding: 24px;
  }
  .billdetail-header-main {
    padding: 40px;
    color: $font-color-1;
    background-color: #fff;
    text-align: center;
    > img {
      width: 72px;
    }
    .billdetail-header-info {
      font-size: 36px;
      line-height: 48px;
      margin-top: 24px;
    }
    .billdetail-header-mount {
      font-size: 70px;
      font-weight: 700;
      margin-top: 40px;
    }
  }
  .billdetail-main {
    background-color: #fff;
    padding: 0 24px;
  }
  .billdetail-item {
    display: flex;
    font-size: 32px;
    line-height: 45px;
    padding: 32px 0;
    border-bottom: 1px solid $border-split-color-1;
    &-left {
      flex: 1 1 100px;
      text-align: left;
      color: $font-color-3;
    }
    &-right {
      min-width: 200px;
      text-align: right;
      flex: 1 1 200px;
      color: $font-color-1;
      word-break: break-all;
    }
  }
</style>
