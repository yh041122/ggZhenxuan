// 定义品牌管理模块接口
import request from '@/utils/request'
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  // /admin/product/baseTrademark/(page)/limit)
  // page 当前页码
  // limit 每页显示多少条
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}
// 获取已有品牌接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
