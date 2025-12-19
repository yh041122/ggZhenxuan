// 路由类型
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj, AttrObj } from '@/api/product/attr/type.ts'
// 小仓库state类型
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
}
// 分类模块state类型
export interface CategoryState {
  Category1Arr: CategoryObj[]
  Category2Arr: CategoryObj[]
  Category3Arr: CategoryObj[]
  C1Id: number | string
  C2Id: number | string
  C3Id: number | string
}
