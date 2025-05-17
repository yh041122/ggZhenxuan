export const route = [
  // login登录页面
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  // home首页
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  // 404页面
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
