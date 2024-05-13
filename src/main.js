import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

// ---------------------------------- 注册sw ----------------------------------

if ('serviceWorker' in navigator) {
  // if (import.meta.env.DEV) {
  //   console.log('Service Worker 注销中...')
  //   navigator.serviceWorker.getRegistrations().then(function (registrations) {
  //     registrations.forEach(function (registration) {
  //       registration
  //         .unregister()
  //         .then(function () {
  //           console.log('Service Worker 注销成功')
  //         })
  //         .catch(function (error) {
  //           console.error('Service Worker 注销失败:', error)
  //         })
  //     })
  //   })
  // }
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      // 注册订阅
      registration.pushManager.getSubscription().then(async function (subscription) {
        console.log('subscription:', subscription)
      })
      console.log('Service Worker registered with scope:', registration.scope)
    })
    .catch(function (error) {
      console.log('Service Worker registration failed:', error)
    })
}
// 使用pinia
app.use(pinia)

// 使用路由
app.use(router)

// 挂载
app.mount('#app')
