import { useStore } from 'vuex'
export default () => {
  const store =  useStore()

  const getCurClientHeight = () => document.documentElement.clientHeight || document.body.clientHeight
  let appClientHeight = getCurClientHeight()
  window.addEventListener('resize', () => {
    // 安卓键盘弹出
    if (appClientHeight - getCurClientHeight() > 200) {
      store.dispatch('setKeyBoardShow', true)
    } else if (getCurClientHeight() - appClientHeight > 200) {
      store.dispatch('setKeyBoardShow', false)
    }
    appClientHeight = getCurClientHeight()
  })
}