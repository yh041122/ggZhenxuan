import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// svg
import 'virtual:svg-icons-register'
// 注册全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
//全局组件插件
import globleComponent from '@/components/index.ts'
app.use(globleComponent)
app.mount('#app')
