<template>
  <div class="handle-item-group">
    <div class="handle-item-wrap">
      <div class="handle-item" v-btnStats v-for="item in handleList" :key="item.title" @click="item.goTo">
        <div class="handle-item-icon">
          <img class="icons" :src="item.icon.value" :alt="item.icon.value" />
        </div>
        <div class="handle-item-content">
          <span class="title">{{ item.title }}</span>
          <div>
            <img class="icons" :src="arrowRightGreySvg" alt="arrowRightGreySvg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity'

  import arrowRightGrey from '@/assets/icons/arrowRightGrey.svg'
  import feedBack from '@/assets/icons/feedBack.svg'
  import withdrawConfig from '@/assets/icons/withdrawConfig.svg'
  import requestion from '@/assets/icons/requestion.svg'
  import billDetail from '@/assets/icons/billDetail.svg'
  import type { HandleItem } from '../types'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  const store = useStore()
  const arrowRightGreySvg = ref(arrowRightGrey)
  const feedBackSvg = ref<string>(feedBack)
  const withdrawConfigSvg = ref<string>(withdrawConfig)
  const requestionSvg = ref<string>(requestion)
  const billDetailSvg = ref<string>(billDetail)

  const router = useRouter()

  const handleList: Array<HandleItem> = [
    {
      icon: billDetailSvg,
      title: '账单明细',
      goTo: () => {
        store.dispatch('addCachedView', { name: 'billStatement' })
        router.push('/billStatement')
      }
    },
    {
      icon: withdrawConfigSvg,
      title: '提现设置',
      goTo: () => {
        router.push('/withdrawConfig')
      }
    },
    {
      icon: feedBackSvg,
      title: '意见反馈',
      goTo: () => {
        router.push('/ideaFeedback')
      }
    },
    {
      icon: requestionSvg,
      title: '常见问题',
      goTo: () => {
        router.push('/commonProblem')
      }
    }
  ]
</script>

<style lang="scss" scoped>
  .handle-item-group {
    position: relative;
    height: 436px;
    .handle-item-wrap {
      width: calc(100% - 48px);
      position: absolute;
      top: -20px;
      background: $white;
      border-radius: 20px;
      margin: 0 24px;
      .handle-item {
        height: 109px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 32px;
        color: $font-color-1;
        &:last-child {
          .handle-item-content {
            border-bottom: none;
          }
        }
        &-icon {
          width: 92px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &-content {
          height: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-right: 24px;
          border-bottom: 1px solid $border-split-color-1;
          .title {
            padding-left: 4px;
          }
        }
        .icons {
          width: 48px;
          height: 48px;
        }
      }
      .handle-item:last-child {
        &-content {
          border: none;
        }
      }
    }
  }
</style>
