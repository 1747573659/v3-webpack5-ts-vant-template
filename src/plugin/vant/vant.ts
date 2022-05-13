import { createApp } from 'vue'
import {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  Switch,
  Icon
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
  Icon
}
export default function (app: ReturnType<typeof createApp>) {
  for (const key in components) {
    app.use(components[key])
  }
}