import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.scss'
import 'lib-flexible/flexible.js'
import useVant from '@/plugin/vant.ts'

const app = createApp(App)
useVant(app)
app.use(store).use(router).mount('#app')
