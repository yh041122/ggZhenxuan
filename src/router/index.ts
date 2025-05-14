import { createRouter, createWebHistory } from 'vue-router'
import TestC from '@/components/TestC.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestC,
    },
  ],
})

export default router
