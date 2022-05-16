import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'
import type { WalletListInfo, WalletList } from '../storeTypes'



const state: WalletListInfo = {
  walletList: []
}

const getters: GetterTree<WalletListInfo, null> = {
  walletList: (state:WalletListInfo): WalletList => state.walletList
}

const mutations: MutationTree<WalletListInfo> = {
  SET_WALLETLIST: (state: WalletListInfo, walletList: WalletList): void => {
    state.walletList = walletList
  }
}

const actions: ActionTree<WalletListInfo, null> = {
  setWalletList({ commit }: { commit: Commit }, walletList: WalletList) {
    commit('SET_WALLETLIST', walletList)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
