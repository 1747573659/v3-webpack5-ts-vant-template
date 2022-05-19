import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'

type State = {showFullScreenLoading: boolean}

const state: State = {
  showFullScreenLoading: false
}

const getters: GetterTree<State, null> = {
  showFullScreenLoading: (state:State): boolean => state.showFullScreenLoading
}

const mutations: MutationTree<State> = {
  SET_FULLLOADING: (state: State, showFullScreenLoading: boolean): void => {
    state.showFullScreenLoading = showFullScreenLoading
  }
}

const actions: ActionTree<State, null> = {
  setFullLoading({ commit }: { commit: Commit }, showFullScreenLoading: boolean) {
    commit('SET_FULLLOADING', showFullScreenLoading)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
