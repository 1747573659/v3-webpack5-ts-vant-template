import { checkNeedVerifySliderApi } from '@/api/wallet'
import { useStore } from 'vuex'
export default () => {
  const store = useStore()
  const checkNeedVerifySlider = async () => {
    try {
      const res = await checkNeedVerifySliderApi({
        phone: store.state.userInfo.loginName as string
      })
      return res
    } catch (e) {
      throw Error(String(e))
    }
  }
  return checkNeedVerifySlider
}