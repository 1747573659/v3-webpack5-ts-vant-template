import { RouteRecordRaw } from 'vue-router'

const myWalletRoutes: Array<RouteRecordRaw> = [
  {
    path: '/myWallet',
    name: 'myWallet',
    component: () => import(/* webpackChunkName: "about" */ '@/views/MyWallet/MyWallet.vue')
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
    path: '/billDetail',
    name: 'billDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/BillDetail/BillDetail.vue')
  }
]

export default myWalletRoutes
