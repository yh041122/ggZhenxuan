// 已有品牌接口返回数据类型
//data里面的records【数组】中的item数据类型
export interface hasTrademarkResponseDataRecordsItem {
  createTime: string
  id?: number //已有的品牌有id【数据库id++给他的】 新增的品牌没有id
  logoUrl: string
  tmName: string
  updateTime: string
}
// data数据类型
interface hasTrademarkResponseData {
  countId: number
  current: number
  hitCount: boolean
  maxLimit: number
  optimizeCountSql: boolean
  orders: []
  pages: number
  records: hasTrademarkResponseDataRecordsItem[]
  searchCount: boolean
  size: number
  total: number
}
// 返回数据总类型
export interface hasTrademarkResponse {
  code: number
  message: string
  ok: boolean
  data: hasTrademarkResponseData
}
