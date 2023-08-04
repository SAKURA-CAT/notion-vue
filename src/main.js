import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

// 使用pinia
app.use(pinia)

// 使用路由
app.use(router)

// 挂载
app.mount('#app')
