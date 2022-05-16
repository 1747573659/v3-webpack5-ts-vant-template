import { onMounted, ref } from 'vue'
import { walletDetail } from '@/api/wallet'
import { useRoute } from 'vue-router'
import { walletDetailRep } from '@/api/types'

export default () => {
  const walletDetailInfo = ref<walletDetailRep>({
    accountName: '',
    availableAmount: 0,
    bankCard: '',
    shortShopName: '',
    walletId: ''
  })
  const route = useRoute()
  
  const getWalletDetail = async () => {
    try {
      const res = await walletDetail({
        walletId: route.query.walletId as string,
        shopAdminId: 70
      })
      walletDetailInfo.value = res
    } catch (e) {}
  }
  onMounted(() => {
    getWalletDetail()
  })
  return {
    walletDetailInfo
  }
}