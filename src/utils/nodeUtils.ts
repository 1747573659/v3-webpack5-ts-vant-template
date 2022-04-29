import { RequireContext } from '@/types/nodeTypes'

function getUrlFiles(url = './modules'): RequireContext {
  return require.context(url, false, /\.ts$/)
}

export { getUrlFiles }
