import request from '@/utils/request'
// 引入类型
import type { CategoryResponse, AttrResponse, AttrObj } from './type'
// 接口数组
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2',
  C3_URL = '/admin/product/getCategory3',
  // 获取选择三级分类后的属性对象
  ATTR_URL = '/admin/product/attrInfoList',
  // 新增或者修改属性
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
}
// 获取一级分类接口方法
export const getCategory1 = () => request.get<any, CategoryResponse>(API.C1_URL)
// 获取二级分类接口方法
export const getCategory2 = (category1Id: number | string) =>
  request.get<any, CategoryResponse>(API.C2_URL + `/${category1Id}`)
// 获取三级分类接口方法
export const getCategory3 = (category2Id: number | string) =>
  request.get<any, CategoryResponse>(API.C3_URL + `/${category2Id}`)
// 获取选择三级分类后的属性对象接口方法
export const getAttrList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => request.get<any, AttrResponse>(API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`)
// 新增或者修改属性接口方法
export const reqAddOrUpdateAttr = (data: AttrObj) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
