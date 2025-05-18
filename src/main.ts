import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// 安装仓库
app.use(pinia)
// 注册路由
app.use(router)
// svg
import 'virtual:svg-icons-register'
// 注册全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
//全局组件插件
import globalComponent from '@/components/index.ts'
app.use(globalComponent)
// 国际化element-plus
import ElementPlus from 'element-plus'
// 导入element-plus的样式
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, {
  // 中文
  locale: zhCn,
})
// 引入全局样式
import '@/styles/index.scss'

// 测试代码 测试假的接口能否使用
// import axios from 'axios'
// 登录接口
// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '11w1111',
//   },
// })

// 将应用挂载到挂载点
app.mount('#app')
