import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const token = store.getters.token
  // 没有token并且要去的页面不是login的时候，自动定位到login
  if (!token && to.name !== 'login') {
    next({name: 'login'})
  } else next()
  document.title = to.meta.title as string
})