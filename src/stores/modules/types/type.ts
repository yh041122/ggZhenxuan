// 路由类型
import type { RouteRecordRaw } from 'vue-router'
// 小仓库state类型
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
}
