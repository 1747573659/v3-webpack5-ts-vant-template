import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  // 第一次登陆的时候拿登陆的值
  if (to.query.openId) {
    const {loginLogoUrl,token,shopAdminId,walletId,openId,shopShortName,walletShopLogoUrl,themeStyle} = to.query as {[key: string]: any}
    document
      .getElementsByTagName("body")[0]
      .setAttribute("data-theme", themeStyle || "offcial"); // 设置主题色
    store.dispatch('setUserInfo', {
      token,
      loginLogoUrl,
      shopAdminId,
      walletId,
      openId,
      shopShortName,
      walletShopLogoUrl
    })
    // 如果有token，即走30天免登录的逻辑，直接跳转到钱包主页
    if (token) {
      next({name: 'myWallet'})
    }
  }
  const token = store.getters.token
  // 没有token并且要去的页面不是login的时候，自动定位到login
  if (!token && to.name !== 'login') {
    next({name: 'login'})
  } else next()
  document.title = to.meta.title as string
})