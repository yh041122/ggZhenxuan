// 定义user接口数据类型
// login表单登录数据
export interface LoginFormData {
  username: string
  password: string
}
// 全部接口返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 登录接口返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string //返回token
}
// 获取用户信息返回数据类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
