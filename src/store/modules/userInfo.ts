import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'
import type { LoginName, NumberOrNull, UserInfo} from '../storeTypes'

const state: UserInfo = {
  loginName: '',
  token: '',
  loginItemType: null,
  shopAdminId: null
}

const getters: GetterTree<UserInfo, null> = {
  loginName: (state: UserInfo): LoginName => state.loginName,
  token: (state: UserInfo): string => state.token,
  loginItemType: (state: UserInfo): NumberOrNull => state.loginItemType,
  shopAdminId: (state: UserInfo): NumberOrNull => state.shopAdminId
}

const mutations: MutationTree<UserInfo> = {
  SET_LOGIN_NAME: (state: UserInfo, loginName: LoginName): void => {
    state.loginName = loginName
  },
  SET_TOKEN: (state: UserInfo, token: string): void => {
    state.token = token
  },
  SET_LOGIN_ITEM_TYPE: (state: UserInfo, loginItemType: NumberOrNull): void => {
    state.loginItemType = loginItemType
  },
  SET_SHOPADMINID: (state: UserInfo, shopAdminId: NumberOrNull): void => {
    state.shopAdminId = shopAdminId
  }
}

const actions: ActionTree<UserInfo, null> = {
  setUserInfo({ commit }: { commit: Commit }, { loginName, token, loginItemType, shopAdminId }: UserInfo) {
    loginName && commit('SET_LOGIN_NAME', loginName)
    token && commit('SET_TOKEN', token)
    loginItemType && commit('SET_LOGIN_ITEM_TYPE', loginItemType)
    shopAdminId && commit('SET_SHOPADMINID', shopAdminId)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
