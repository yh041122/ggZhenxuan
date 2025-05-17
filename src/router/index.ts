import { createRouter, createWebHistory } from 'vue-router'
import { route } from './router.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route,
  // 滚动行为
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
