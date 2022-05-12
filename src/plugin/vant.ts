import { createApp } from 'vue'
import {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  CellGroup
} from 'vant'
type stringKey = Record<string, any>
const components:stringKey = {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  CellGroup
}
export default function (app: ReturnType<typeof createApp>) {
  for (const key in components) {
    app.use(components[key])
  }
}