import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: (to, from) => {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    if (to.path !== from.path) {
      return {
        top: 0
      }
    }
  }
})

export default router
