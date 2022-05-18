import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'
import type { LoginName, NumberOrNull, UserInfo} from '../storeTypes'

const state: UserInfo = {
  loginName: '',
  token: '',
  loginItemType: 0,
  shopAdminId: 0,
  walletId: '',
  openId: ''
}

const getters: GetterTree<UserInfo, null> = {
  loginName: (state: UserInfo): LoginName => state.loginName,
  token: (state: UserInfo): string => state.token,
  loginItemType: (state: UserInfo): NumberOrNull => state.loginItemType,
  shopAdminId: (state: UserInfo): NumberOrNull => state.shopAdminId,
  walletId: (state: UserInfo): string => state.walletId,
  openId: (state: UserInfo): string => state.openId,
}

const mutations: MutationTree<UserInfo> = {
  SET_LOGIN_NAME: (state: UserInfo, loginName: LoginName): void => {
    state.loginName = loginName
  },
  SET_TOKEN: (state: UserInfo, token: string): void => {
    state.token = token
  },
  SET_LOGIN_ITEM_TYPE: (state: UserInfo, loginItemType: number): void => {
    state.loginItemType = loginItemType
  },
  SET_SHOPADMINID: (state: UserInfo, shopAdminId: number): void => {
    state.shopAdminId = shopAdminId
  },
  SET_WALLETID: (state: UserInfo, walletId: string): void => {
    state.walletId = walletId
  },
  SET_OPENID: (state: UserInfo, openId: string): void => {
    state.openId = openId
  },
  RESET_USERINFO: (state: UserInfo): void => {
    state.loginName = ''
    state.token = ''
    state.loginItemType = 0
    state.shopAdminId = 0
    state.walletId = ''
    state.openId = ''
  }
}

const actions: ActionTree<UserInfo, null> = {
  setUserInfo({ commit }: { commit: Commit }, { loginName, token, loginItemType, shopAdminId, walletId, openId }: UserInfo) {
    loginName && commit('SET_LOGIN_NAME', loginName)
    token && commit('SET_TOKEN', token)
    loginItemType && commit('SET_LOGIN_ITEM_TYPE', loginItemType)
    shopAdminId && commit('SET_SHOPADMINID', shopAdminId)
    walletId && commit('SET_WALLETID', walletId)
    openId && commit('SET_OPENID', openId)
  },
  resetUserInfo({ commit }: { commit: Commit }) {
    commit('RESET_USERINFO')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
