import { createStore, ModuleTree } from 'vuex'

interface RequireContext {
  keys(): string[]
  (id: string): any
  <T>(id: string): T
  resolve(id: string): string
  /** The module id of the context module. This may be useful for module.hot.accept. */
  id: string
}

const files: RequireContext = require.context('./modules', false, /\.ts$/)
const modules: ModuleTree<null> = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default createStore({
  modules
})
