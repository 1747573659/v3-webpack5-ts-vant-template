import { checkNeedVerifySliderApi } from '@/api/wallet'
import { computed, Ref, watch } from 'vue'
import { useStore } from 'vuex'

type SendMsgFunc = () => any 

export default (func: SendMsgFunc, loginName?: Ref<string>) => {
  const store = useStore()
  const showSliderBar = computed(() => store.state.showSliderBar.showSliderBar)

  watch(showSliderBar, () => {
    if (!showSliderBar.value) {
      func()
    }
  })

  const checkNeedVerifySlider = async () => {
    try {
      const res = await checkNeedVerifySliderApi({
        sendItem: loginName?.value.replace(/ /g, '') || store.state.userInfo.loginName as string,
        shopAdminId: store.state.userInfo.shopAdminId
      })
      if (!res) {
        return func()
      } else {
        store.dispatch('setShowSliderBar', true)
      }
    } catch (e) {
      throw Error(String(e))
    }
  }
  return checkNeedVerifySlider
}