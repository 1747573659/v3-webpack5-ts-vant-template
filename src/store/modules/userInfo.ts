import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'
import type { LoginName, NumberOrNull, UserInfo} from '../storeTypes'

const state: UserInfo = {
  loginName: '',
  token: '',
  loginType: null,
  shopAdminId: null
}

const getters: GetterTree<UserInfo, null> = {
  loginName: (state: UserInfo): LoginName => state.loginName,
  token: (state: UserInfo): string => state.token,
  loginType: (state: UserInfo): NumberOrNull => state.loginType,
  shopAdminId: (state: UserInfo): NumberOrNull => state.shopAdminId
}

const mutations: MutationTree<UserInfo> = {
  SET_LOGIN_NAME: (state: UserInfo, loginName: LoginName): void => {
    state.loginName = loginName
  },
  SET_TOKEN: (state: UserInfo, token: string): void => {
    state.token = token
  },
  SET_LOGIN_TYPE: (state: UserInfo, loginType: NumberOrNull): void => {
    state.loginType = loginType
  },
  SET_SHOPADMINID: (state: UserInfo, shopAdminId: NumberOrNull): void => {
    state.shopAdminId = shopAdminId
  }
}

const actions: ActionTree<UserInfo, null> = {
  setUserInfo({ commit }: { commit: Commit }, userInfo: UserInfo) {
    commit('SET_LOGIN_NAME', userInfo.loginName)
    commit('SET_TOKEN', userInfo.token)
    commit('SET_LOGIN_TYPE', userInfo.loginType)
    commit('SET_SHOPADMINID', userInfo.shopAdminId)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
