// 用户小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue' //数据要有响应式特性
import { reqLogin } from '@/api/user'
// 引入数据类型
// 登录参数
import type { LoginRequestParams, LoginResponse } from '@/api/user/type.ts'
// 获取token
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
export const useUserStore = defineStore('User', () => {
  // token
  const token = ref(GET_TOKEN())
  // 用户登录的方法
  const userLogin = async (data: LoginRequestParams) => {
    const res: LoginResponse = await reqLogin(data)
    console.log(res)
    // 登录成功200->token
    if (res.code === 200) {
      // 存储到user仓库
      token.value = res.data.token!
      console.log(token)
      // 本地存储持久化
      SET_TOKEN(token.value)
      return 'ok'
    }
    // 登录失败201->错误信息
    else {
      console.log(res)

      return Promise.reject(new Error(res.data.message!))
    }
  }
  return {
    // state
    token,
    // action
    userLogin,
    // getters
  }
})
