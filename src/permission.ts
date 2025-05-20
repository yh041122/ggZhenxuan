// 引入路由
import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
// 引入nprogress样式
import 'nprogress/nprogress.css'
// 前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // 获取token
  nprogress.start()
  next()
})
// 后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
