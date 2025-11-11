// 定义品牌管理模块接口
import request from '@/utils/request'
// 已有品牌返回数据总类型
import type { hasTrademarkResponse, TradeMark } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  // /admin/product/baseTrademark/(page)/limit)
  // page 当前页码
  // limit 每页显示多少条
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}
// 获取已有品牌接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, hasTrademarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`)
//添加和修改品牌接口，因为只有id是可选的，所以可以使用同一个接口
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 如果有id，修改品牌
  if (data.id) {
    return request.put<TradeMark, any>(API.UPDATETRADEMARK_URL, data)
  }
  //如果没有id，添加品牌
  else {
    return request.post<TradeMark, any>(API.ADDTRADEMARK_URL, data)
  }
}
