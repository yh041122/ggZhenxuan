/*
    获取分类
*/
// 基本返回格式
export interface BaseResponse {
  code: number
  message: string
  ok: boolean
}
// CategoryObj 数据类型
export interface CategoryObj {
  id: number
  name: string
  catrgory2Id?: number
  catrgory3Id?: number
}
// 获取【分类】完整版返回格式
export interface CategoryResponse extends BaseResponse {
  data: CategoryObj[]
}
/*
    获取属性对象类型
*/
// 属性值对象类型
export interface AttrValue {
  id?: number //新增的没有id和attrId
  valueName: string
  attrId?: number
  flag?: boolean
}
// 属性对象类型
export interface AttrObj {
  id?: number //新增的没有id
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}
// 获取【属性对象】完整版返回格式
export interface AttrResponse extends BaseResponse {
  data: AttrObj[]
}
