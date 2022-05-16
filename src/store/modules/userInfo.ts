/*
 * @Date         : 2022-04-29 10:07:53
 * @LastEditors  : 庄鸿斌
 * @LastEditTime : 2022-05-16 15:01:21
 */
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
  setUserInfo({ commit }: { commit: Commit }, userInfo: UserInfo) {
    commit('SET_LOGIN_NAME', userInfo.loginName)
    commit('SET_TOKEN', userInfo.token)
    commit('SET_LOGIN_ITEM_TYPE', userInfo.loginItemType)
    commit('SET_SHOPADMINID', userInfo.shopAdminId)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
