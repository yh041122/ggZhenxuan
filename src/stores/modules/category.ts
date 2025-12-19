import { defineStore } from 'pinia'
import { getCategory1, getCategory2, getCategory3 } from '@/api/product/attr'
// 引入state类型
import type { CategoryState } from './types/type'
// 引入响应类型
import type { CategoryResponse } from '@/api/product/attr/type'
export const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      Category1Arr: [],
      Category2Arr: [],
      Category3Arr: [],
      C1Id: '',
      C2Id: '',
      C3Id: '',
    }
  },
  actions: {
    // 获取一级分类
    async getC1() {
      const res: CategoryResponse = await getCategory1()
      if (res.code === 200) {
        this.Category1Arr = res.data
      }
    },
    // 获取二级分类
    async getC2() {
      const res: CategoryResponse = await getCategory2(this.C1Id)
      if (res.code === 200) {
        this.Category2Arr = res.data
      }
    },
    // 获取三级分类
    async getC3() {
      const res: CategoryResponse = await getCategory3(this.C2Id)
      if (res.code === 200) {
        this.Category3Arr = res.data
      }
    },

    // 清空二级分类数据
    clearC2() {
      this.Category2Arr = []
      this.C2Id = ''
    },
    // 清空三级分类数据
    ClearC3() {
      this.Category3Arr = []
      this.C3Id = ''
    },
  },
  getters: {},
})
