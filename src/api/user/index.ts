// 统一管理用户相关的接口
import request from '@/utils/request'
// 类型
import type { LoginRequestParams, LoginResponse, UserInfoResponseData } from './type'
// 统一管理接口
enum API {
  LOGIN_URL = '/user/login', // 登录接口
  USERINFO_URL = '/user/info', // 用户信息接口
}
// 暴露请求函数
// 登录接口
export const reqLogin = (data: LoginRequestParams) =>
  request.post<LoginResponse>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<UserInfoResponseData>(API.USERINFO_URL)
