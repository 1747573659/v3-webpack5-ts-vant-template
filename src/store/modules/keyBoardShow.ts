import { Commit, GetterTree, MutationTree, ActionTree } from 'vuex'

type State = {keyBoardShow: boolean}

const state: State = {
  keyBoardShow: false
}

const getters: GetterTree<State, null> = {
  keyBoardShow: (state:State): boolean => state.keyBoardShow
}

const mutations: MutationTree<State> = {
  SET_KEYBOARDSHOW: (state: State, keyBoardShow: boolean): void => {
    state.keyBoardShow = keyBoardShow
  }
}

const actions: ActionTree<State, null> = {
  setKeyBoardShow({ commit }: { commit: Commit }, keyBoardShow: boolean) {
    commit('SET_KEYBOARDSHOW', keyBoardShow)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
