import { createApp } from 'vue'
import {
  Button
} from 'vant'
type stringKey = Record<string, any>
const components:stringKey = {
  Button
}
export default function (app: ReturnType<typeof createApp>) {
  for (const key in components) {
    app.use(components[key])
  }
}