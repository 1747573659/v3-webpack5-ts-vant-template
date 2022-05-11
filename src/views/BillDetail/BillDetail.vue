<template>
  <div class="billdetail-wrap">
    <div class="billdetail-header">
      <div class="billdetail-header-main">
        <img :src="currentItem.src" alt="" />
        <div class="billdetail-header-info">
          {{ currentItem.label }}{{ state.billDetail.name ? `-${state.billDetail.name}` : '' }}
        </div>
        <div class="billdetail-header-mount">
          {{ currentItem.isAdd ? '+' : '-' }}{{ state.billDetail.amount }}
        </div>
      </div>
    </div>
    <div class="billdetail-main">
      <div class="billdetail-item" v-for="billItem in currentItem.detailList" :key="billItem.key">
        <div class="billdetail-item-left">
          {{ billItem.label }}
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
  import { billTypeEnum } from '@/enum/billStatement'
  type billDetailType = {
    type: keyof typeof billTypeEnum
    [propName: string]: string
  }
  const route = useRoute()
  const state = reactive({
    billId: route.params.id,
    billDetail: {} as billDetailType
  })
  console.log(route.params, 'route')
  const getBillDetails = () => {
    // MYTODO: 模拟数据
    new Promise(res => {
      setTimeout(() => res([]))
    }).then(() => {
      state.billDetail = {
        type: 'refund',
        rechargeTime: 'Date.now()',
        amount: '23940.21',
        name: '张三张三张三张三张三张三',
        partnerRefundSerialNo: '12343 432435 54355436 867587',
        refundSerialNumber: 'Date.now()',
        remark: '测试长度测试长度测试长度测长度测试长度'
      }
    })
    // queryBillDetails({ id: state.billId }).then(res => {
    //   state.billDetail = res
    // })
  }
  const currentItem = computed(() => billTypeEnum[state.billDetail.type] || {})
  console.log(currentItem, billTypeEnum, 'currentItem')
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
    }
    &-right {
      min-width: 200px;
      text-align: right;
      flex: 1 1 200px;
    }
  }
</style>
