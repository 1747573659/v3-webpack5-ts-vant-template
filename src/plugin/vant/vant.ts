import { createApp } from 'vue'
import {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  Field,
  Switch,
  Icon,
  CellGroup,
  Popup,
  Dialog,
  Tabs,
  Tab,
  NumberKeyboard,
  Calendar,
  Loading,
  DatetimePicker,
  PullRefresh
} from 'vant'
import './reset.scss'
type stringKey = Record<string, any>
const components: stringKey = {
  Button,
  ActionSheet,
  Col,
  Row,
  Cell,
  List,
  Field,
  Switch,
  Icon,
  CellGroup,
  Popup,
  Dialog,
  Tabs,
  Tab,
  NumberKeyboard,
  Calendar,
  Loading,
  DatetimePicker,
  PullRefresh
}
export default function (app: ReturnType<typeof createApp>) {
  for (const key in components) {
    app.use(components[key])
  }
}
