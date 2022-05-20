import { RouteRecordRaw } from 'vue-router'

const myWalletRoutes: Array<RouteRecordRaw> = [
  {
    path: '/walletList',
    name: 'walletList',
    meta: {
      title: '选择钱包'
    },
    component: () => import('@/views/WalletList/WalletList.vue')
  },
  {
    path: '/myWallet',
    name: 'myWallet',
    meta: {
      title: '钱包首页'
    },
    component: () => import('@/views/MyWallet/MyWallet.vue')
  },
  {
    path: '/merchantInfo',
    name: 'merchantInfo',
    meta: {
      title: '详情',
      showBackBtn: true
    },
    component: () => import('@/views/MerchantInfo/MerchantInfo.vue')
  },
  {
    path: '/kmTechPolicy',
    name: 'kmTechPolicy',
    meta: {
      title: '科脉技术隐私政策',
      showBackBtn: true
    },
    component: () => import('@/views/MerchantInfo/KmTechPolicy.vue')
  },
  {
    path: '/walletWithdraw',
    name: 'walletWithdraw',
    meta: {
      title: '提现',
      showBackBtn: true
    },
    component: () => import('@/views/WalletWithdraw/WalletWithdraw.vue')
  },
  {
    path: '/withdrawConfig',
    name: 'withdrawConfig',
    meta: {
      title: '提现设置',
      showBackBtn: true
    },
    component: () => import('@/views/WithdrawConfig/WithdrawConfig.vue')
  },
  {
    path: '/billStatement',
    name: 'billStatement',
    meta: {
      title: '账单明细',
      showBackBtn: true
    },
    component: () => import('@/views/BillStatement/BillStatement.vue')
  },
  {
    path: '/billDetail',
    name: 'billDetail',
    meta: {
      title: '账单详情',
      showBackBtn: true
    },
    component: () => import('@/views/BillDetail/BillDetail.vue')
  },
  {
    path: '/ideaFeedback',
    name: 'ideaFeedback',
    meta: {
      title: '意见反馈',
      showBackBtn: true
    },
    component: () => import('@/views/ideaFeedback/ideaFeedback.vue')
  },
  {
    path: '/commonProblem',
    name: 'commonProblem',
    meta: {
      title: '常见问题',
      showBackBtn: true
    },
    component: () => import('@/views/commonProblem/commonProblem.vue')
  }
]

export default myWalletRoutes
