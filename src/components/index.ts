import type { App, Component } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import PageNation from '@/components/PageNation/index.vue'

interface GlobalComponents {
  SvgIcon: Component
  PageNation: Component
}

const allGlobalComponent: GlobalComponents = { SvgIcon, PageNation }

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
  },
}
