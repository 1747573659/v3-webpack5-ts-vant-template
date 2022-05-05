import { createStore, ModuleTree } from 'vuex'
import { RequireContext } from '@/types/nodeTypes'

const files: RequireContext = require.context('./modules', false, /\.ts$/)
const modules: ModuleTree<null> = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default createStore({
  modules
})
