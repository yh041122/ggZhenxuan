// 引入路由
import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
// 引入nprogress样式
import 'nprogress/nprogress.css'
// 关闭 nprogress 进度条右侧的小圆圈
nprogress.configure({ showSpinner: false })
//
import setting from './setting'
// 在组件外部使用小仓库数据 必须先引入大仓库
import pinia from './stores'
import { useUserStore } from './stores/modules/user'
const userStore = useUserStore(pinia)
// 前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  //修改页面标题
  document.title = `${setting.title} - ${to.meta.title}`
  const username = userStore.userInfoData.username
  // 获取token
  nprogress.start()
  const token = userStore.token
  // 判断token是否存在
  if (token) {
    if (to.path === '/login') {
      next({ path: from.path }) //为什么跳转到/home
    } else {
      //访问其他页面
      //如果已经获取到了用户信息 - 放行
      if (username) {
        next()
      }
      //如果没有获取到用户信息 - 在守卫发请求获取用户信息
      else {
        try {
          //发请求获取用户信息
          await userStore.userInfo()
          // 放行
          next()
        } catch (error) {
          //token过期 退出登录
          //等待异步代码执行完毕 再放行
          await userStore.logout()
          //跳转到 login 并携带to的地址
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      //跳转login 登录成功后 跳到刚才想去的页面
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
// 登录成功 不能访问login页
// 登录不成功 只能访问login页
