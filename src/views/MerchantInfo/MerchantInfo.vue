<script lang="ts" setup>
  import { reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const merchantEnum: object[] = [
    {
      title: '基本信息',
      children: [
        {
          key: 'q',
          label: '商户简称'
        },
        {
          key: 'rr',
          label: '钱包ID'
        }
      ]
    },
    {
      title: '企业资料',
      children: [
        {
          key: 'qff',
          label: '企业名称'
        },
        {
          key: 'rrggfd',
          label: '营业执照号'
        }
      ]
    },
    {
      title: '运营者信息',
      children: [
        {
          key: 'qhgfh',
          label: '法人姓名'
        },
        {
          key: 'rrhdgfhgf',
          label: '法人身份证'
        },
        {
          key: 'hdhgfh',
          label: '法人手机号'
        },
        {
          key: 'ytetr',
          label: '账户名称'
        },
        {
          key: 'rrhdgfhgdetyhgf',
          label: '银行卡号'
        },
        {
          key: 'yrejyu',
          label: '开户行'
        }
      ]
    }
  ]
  const merchantInfo = reactive({
    q: '测试测试',
    rrggfd: '测试长度测试长度测试长度测试长度测试长度测试长度',
    qff: 'ddddddddddddddddddbvfsddddddddddddddddddddddddddd',
    hdhgfh: '电话号码电话号码电话号码'
  })
  const handleToTechPolicy = () => {
    router.push('/kmTechPolicy')
  }
  const handleBack = () => {
    router.push('/myWallet')
  }
  onMounted(() => {
    // MYTODO: 请求接口
    // merchantInfo =
  })
</script>

<template>
  <div class="merchantInfo-wrap">
    <div class="merchantInfo-main">
      <div class="merchantInfo-card" v-for="(item, index) in merchantEnum" :key="index">
        <div class="merchantInfo-title">{{ item.title }}</div>
        <div class="merchantInfo-item" v-for="childItem in item.children" :key="childItem.key">
          <div class="merchantInfo-item-inner">
            <div class="left">{{ childItem.label }}</div>
            <div class="right">{{ merchantInfo[childItem.key] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="merchantInfo-policy">
      <span @click="handleToTechPolicy">《科脉技术隐私政策》</span>
    </div>
    <!-- <div class="merchantInfo-back">
      <van-button type="default" @click="handleBack">返回</van-button>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
  .merchantInfo {
    &-wrap {
      text-align: left;
      background-color: #fff;
    }
    &-title {
      padding: 0 24px;
      font-size: 28px;
      color: $font-color-2;
      height: 86px;
      line-height: 86px;
      background-color: $bg-light-color-1;
    }
  }
  .merchantInfo-item {
    padding: 0 24px;
  }
  .merchantInfo-item-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    font-size: 32px;
    background-color: #fff;
    border-bottom: 1px solid $border-split-color-1;
    .left {
      flex: 0 0 300px;
      color: $font-color-3;
    }
    .right {
      word-break: break-all;
      color: $font-color-1;
    }
  }
  .merchantInfo-policy {
    text-align: center;
    height: 110px;
    line-height: 110px;
    color: $font-color-2;
    background-color: $bg-light-color-1;
  }
  .merchantInfo-back {
    padding: 24px 32px;
    background-color: #fff;
    .van-button {
      width: 100%;
      border-radius: 10px;
      background-color: $bg-light-color-1;
    }
  }
</style>
