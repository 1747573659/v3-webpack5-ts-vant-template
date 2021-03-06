import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import btnStats from '@/directives/btnStats'
import store from './store'
import '@/assets/styles/index.scss'
import 'lib-flexible/flexible.js'
import useVant from '@/plugin/vant/vant.ts'
import '@/router/permission'
const app = createApp(App)
useVant(app)
app.use(store).use(router).directive('btnStats', btnStats).mount('#app')
