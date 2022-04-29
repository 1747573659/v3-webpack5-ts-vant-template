import { createRouter, createWebHistory, RouterScrollBehavior } from 'vue-router'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
