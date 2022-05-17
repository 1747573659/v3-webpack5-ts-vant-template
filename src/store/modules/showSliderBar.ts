import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'

type State = {showSliderBar: boolean}

const state: State = {
  showSliderBar: false
}

const getters: GetterTree<State, null> = {
  showSliderBar: (state:State): boolean => state.showSliderBar
}

const mutations: MutationTree<State> = {
  SET_SLIDERBAR: (state: State, showSliderBar: boolean): void => {
    state.showSliderBar = showSliderBar
  }
}

const actions: ActionTree<State, null> = {
  setWalletList({ commit }: { commit: Commit }, showSliderBar: boolean) {
    commit('SET_SLIDERBAR', showSliderBar)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
