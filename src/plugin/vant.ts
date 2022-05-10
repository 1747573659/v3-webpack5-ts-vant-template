import { createApp } from 'vue'
import {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List
} from 'vant'
type stringKey = Record<string, any>
const components:stringKey = {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List
}
export default function (app: ReturnType<typeof createApp>) {
  for (const key in components) {
    app.use(components[key])
  }
}