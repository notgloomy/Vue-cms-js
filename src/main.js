import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'
import '@/assets/css/index.css'
import App from './App.vue'
import pinia from './stores/index.js'
import router from './router'
import { useUserStore } from './stores/modules/user.js'
import numberFormat from './directives/numberFormat'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)

const userStore = useUserStore()
userStore.freshAction()
app.use(router)

// 注册自定义指令
app.directive('number', numberFormat)
app.mount('#app')
