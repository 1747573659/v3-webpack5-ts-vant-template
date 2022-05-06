import { RouteRecordRaw } from 'vue-router'
import { RequireContext } from '@/types/nodeTypes'

const files: RequireContext = require.context('./modules', false, /\.ts$/)
const workRoutes: Array<RouteRecordRaw> = []

files.keys().forEach(key => {
  workRoutes.push(...files(key).default)
})

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage/LoginPage.vue')
  },
  ...workRoutes
]

export default routes
