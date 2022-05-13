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
      title: '企业钱包'
    },
    component: () => import('@/views/MyWallet/MyWallet.vue')
  },
  {
    path: '/merchantInfo',
    name: 'merchantInfo',
    component: () => import('@/views/MerchantInfo/MerchantInfo.vue')
  },
  {
    path: '/kmTechPolicy',
    name: 'kmTechPolicy',
    component: () => import('@/views/MerchantInfo/KmTechPolicy.vue')
  },
  {
    path: '/walletDetail',
    name: 'walletDetail',
    component: () => import('@/views/WalletDetail/WalletDetail.vue')
  },
  {
    path: '/walletWithdraw',
    name: 'walletWithdraw',
    component: () => import('@/views/WalletWithdraw/WalletWithdraw.vue')
  },
  {
    path: '/withdrawConfig',
    name: 'withdrawConfig',
    component: () => import('@/views/WithdrawConfig/WithdrawConfig.vue')
  },
  {
    path: '/billStatement',
    name: 'billStatement',
    component: () => import('@/views/BillStatement/BillStatement.vue')
  },
  {
    path: '/billDetail/:id',
    name: 'billDetail',
    component: () => import('@/views/BillDetail/BillDetail.vue')
  }
]

export default myWalletRoutes
