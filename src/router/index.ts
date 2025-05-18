import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  // 页面导航后 滚动条的位置
  scrollBehavior() {
    return {
      top: 0, //滚动到顶部
      left: 0, //滚动到左侧
    }
  },
})

export default router
