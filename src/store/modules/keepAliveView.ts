import { MutationTree, ActionTree } from 'vuex'

type State = {cachedViews: string[]}

const state: State = {
  cachedViews: ['billStatement']
}

const mutations: MutationTree<State> = {
  ADD_CACHED_VIEW: (state: any, view: any) => {
    if (state.cachedViews.includes(view.name)) return
    state.cachedViews.push(view.name)
  },
  DEL_CACHED_VIEW: (state: any, view: any) => {
    for (let i = 0; i < state.cachedViews.length; i++) {
      if (state.cachedViews[i] === view.name) {
        state.cachedViews.splice(i, 1)
        break
      }
    }
  }
}

const actions: ActionTree<State, null> = {
  addCachedView({ commit }: any, view: any) {
    commit('ADD_CACHED_VIEW', view)
  },
  delCachedView({ commit, state }: any, view: any) {
    console.log('删除', view, view.name)
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
}

export default {
  state,
  mutations,
  actions
}
