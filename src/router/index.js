/**
 * 以history模式创建路由，包含两个页面，分别是home和about，对应项目展示和项目介绍
 */
import { createRouter, createWebHistory } from 'vue-router'

// 静态路由
const routes = [
  // 首页
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home/HomeView.vue')
  },
  // 设置页
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/About/AboutView.vue')
  }
]

// 创建路由（历史模式）
const router = createRouter({
  history: createWebHistory(),
  base: '/',
  routes
})

export default router
