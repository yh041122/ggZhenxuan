// 用户登录
// reqLogin登录接口 request类型
export interface LoginRequestParams {
  username: string
  password: string
}
// reqLogin登录接口 resonse类型
interface LoginSucResponseData {
  token: string
}
interface LoginFaiResponseData {
  message: string
}
export interface LoginSucResponse {
  code: number
  data: LoginSucResponseData //返回的是token字符串
}
export interface LoginFaiResponse {
  code: number
  data: LoginFaiResponseData //返回的是token字符串
}
// 用户信息
// 用户信息的数据类型
interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: Array<string>
  buttons: Array<string>
  routes: Array<string>
  token: string
}
interface UserInfoData {
  checkUser: UserInfo
}
// 用户信息返回类型
export interface UserInfoResponseData {
  code: number
  data: UserInfoData
}
