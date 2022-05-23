<template>
  <div class="billdetail-wrap">
    <div class="billdetail-header">
      <div class="billdetail-header-main">
        <img :src="currentItem.src" alt="" />
        <div class="billdetail-header-info">
          {{ currentItem.label
          }}{{
            state.billDetail.shortShopName && currentItem.shortShopName
              ? `-${state.billDetail.shortShopName}`
              : ''
          }}
        </div>
        <div class="billdetail-header-mount">
          {{ state.billDetail.category === 1 ? '+' : '-'
          }}{{ formatYuanAmount(state.billDetail.amount || 0) }}
        </div>
      </div>
    </div>
    <div class="billdetail-main">
      <div class="inner">
        <div class="billdetail-item" v-for="billItem in currentItem.detailList" :key="billItem.key">
          <div class="billdetail-item-left">
            {{ billItem.label }}
          </div>
          <div class="billdetail-item-right">
            {{ billItem.value }}
          </div>
        </div>
      </div>
    </div>
    <overlay-loading :show="loading" content="加载中..."></overlay-loading>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import OverlayLoading from '@/components/OverlayLoading/OverlayLoading.vue'
  import { formatYuanAmount } from '@/utils/formateMoney'
  import { queryBillDetails } from '@/api/wallet'
  import { getBillItemList } from '@/enum/billStatement'
  type billDetailQueryType = {
    categoryType: string
    transactionNo: string
    transactionType: string
    // orderType: any
    // [propName: string]: string | number
  }
  const route = useRoute()
  const loading = ref(false)
  const state = reactive({
    queryData: route.query as billDetailQueryType,
    billDetail: {
      orderType: Number(route.query.categoryType),
      category: 0
    }
  })

  const getBillDetails = () => {
    loading.value = true
    queryBillDetails(state.queryData)
      .then(res => {
        state.billDetail = res
      })
      .finally(() => (loading.value = false))
  }

  const currentItem = computed(() => {
    return getBillItemList(state.billDetail)
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
    padding-bottom: 160px;
    .inner {
      padding: 0 24px;
      background-color: #fff;
    }
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
