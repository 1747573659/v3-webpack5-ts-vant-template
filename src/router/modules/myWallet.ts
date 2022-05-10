import { RouteRecordRaw } from 'vue-router'

const myWalletRoutes: Array<RouteRecordRaw> = [
  {
    path: '/myWallet',
    name: 'myWallet',
    component: () => import(/* webpackChunkName: "about" */ '@/views/MyWallet/MyWallet.vue')
  },
  {
    path: '/merchantInfo',
    name: 'merchantInfo',
    component: () => import(/* webpackChunkName: "about" */ '@/views/MerchantInfo/MerchantInfo.vue')
  },
  {
    path: '/kmTechPolicy',
    name: 'kmTechPolicy',
    component: () => import(/* webpackChunkName: "about" */ '@/views/MerchantInfo/KmTechPolicy.vue')
  },
  {
    path: '/walletDetail',
    name: 'walletDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/WalletDetail/WalletDetail.vue')
  },
  {
    path: '/walletWithdraw',
    name: 'walletWithdraw',
    component: () => import(/* webpackChunkName: "about" */ '@/views/WalletWithdraw/WalletWithdraw.vue')
  },
  {
    path: '/withdrawConfig',
    name: 'withdrawConfig',
    component: () => import(/* webpackChunkName: "about" */ '@/views/WithdrawConfig/WithdrawConfig.vue')
  },
  {
    path: '/billStatement',
    name: 'billStatement',
    component: () => import(/* webpackChunkName: "about" */ '@/views/BillStatement/BillStatement.vue')
  },
  {
    path: '/billDetail/:id',
    name: 'billDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/BillDetail/BillDetail.vue')
  }
]

export default myWalletRoutes
