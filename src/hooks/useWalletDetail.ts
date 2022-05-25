import { onMounted, ref } from 'vue'
import { walletDetail } from '@/api/wallet'
import { walletDetailRep } from '@/api/types'
import { useStore } from 'vuex'
import { UserInfo } from '@/store/storeTypes'
export default () => {
  const loading = ref(false)
  const walletDetailInfo = ref<walletDetailRep>({
    accountName: '',
    availableAmount: 0,
    bankCard: '',
    shortShopName: '',
    walletId: ''
  })
  const store = useStore()
  
  const getWalletDetail = async () => {
    loading.value = true
    const { walletId, shopAdminId, openId }: UserInfo = store.state.userInfo
    try {
      const res = await walletDetail({
        walletId,
        shopAdminId,
        openId
      })
      walletDetailInfo.value = res
    } catch (e) {} finally {
      loading.value = false
    }
  }
  onMounted(() => {
    getWalletDetail()
  })
  return {
    walletDetailInfo,
    loading
  }
}