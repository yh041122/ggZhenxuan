// 统一管理用户相关的接口
import request from '@/utils/request'
// 类型

// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login', // 登录接口
  USERINFO_URL = '/admin/acl/index/info', // 用户信息接口
  LOGOUT_URL = '/admin/acl/index/logout', // 用户信息接口
}
// 暴露请求函数
// 登录接口
export const reqLogin = (data: any) =>
  // request.post<T, U>：T代表请求参数的类型，U代表响应数据的类型
  request.post<any>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
