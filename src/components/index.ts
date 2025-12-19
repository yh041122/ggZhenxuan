import type { App, Component } from 'vue'
// 引入全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import PageNation from '@/components/PageNation/index.vue'
import Category from '@/components/Category/index.vue'
interface GlobalComponents {
  SvgIcon: Component
  PageNation: Component
  Category: Component
}
// 全局组件对象
const allGlobalComponent: GlobalComponents = { SvgIcon, PageNation, Category }
// 注册element-plus提供图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  /**
   * 安装全局组件到 Vue 应用实例的方法。
   * @param app - Vue 应用实例，用于注册全局组件。
   */
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(
        key as keyof GlobalComponents,
        allGlobalComponent[key as keyof GlobalComponents],
      )
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
