import { onMounted, Ref, watch } from 'vue'

export default (refVal: Ref<any>) => {
  const listenPopstate = () => {
    console.log('popstate')
  }
  onMounted(() => {
    window.addEventListener('popstate', listenPopstate)
  })
  watch(refVal, () => {
    if (refVal.value) {
      history.pushState(null, '', 'walletWithdraw')
    } else {
      history.replaceState(null, '', 'walletWithdraw')
    }
  })
}