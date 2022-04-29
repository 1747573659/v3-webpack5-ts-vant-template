import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'

type LoginName = string | null

type UserInfo = {
  loginName: LoginName
}

const state: UserInfo = {
  loginName: ''
}

const getters: GetterTree<UserInfo, null> = {
  loginName: (state: UserInfo): LoginName => state.loginName
}

const mutations: MutationTree<UserInfo> = {
  SET_LOGIN_NAME: (state: UserInfo, loginName: LoginName): void => {
    state.loginName = loginName
  }
}

const actions: ActionTree<UserInfo, null> = {
  Login({ commit }: { commit: Commit }, userInfo: UserInfo) {
    commit('SET_LOGIN_NAME', userInfo.loginName)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
