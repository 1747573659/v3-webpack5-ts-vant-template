import {
  Button
} from 'vant'
const components = {
  Button
}
export default function (app) {
  for (let key in components) {
    app.use(components[key])
  }
}