import { onMounted, ref } from 'vue'
import { walletDetail } from '@/api/wallet'
import { walletDetailRep } from '@/api/types'
import { useStore } from 'vuex'
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
    try {
      const res = await walletDetail({
        walletId: store.state.userInfo.walletId,
        shopAdminId: 70
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