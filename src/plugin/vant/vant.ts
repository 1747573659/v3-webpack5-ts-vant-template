import { createApp } from 'vue'
import {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  Switch,
  Icon,
  CellGroup
} from 'vant'
import './reset.scss'
type stringKey = Record<string, any>
const components:stringKey = {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  Switch,
  Icon,
  CellGroup
}
export default function (app: ReturnType<typeof createApp>) {
  for (const key in components) {
    app.use(components[key])
  }
}