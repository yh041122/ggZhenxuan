export const routes = [
  // login登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  // home首页
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
  },
  // 404页面
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  // 任意页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
