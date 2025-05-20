// 用户小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue' //数据要有响应式特性
import { reqLogin, reqUserInfo } from '@/api/user'
// 登录参数
import type { LoginRequestParams, LoginResponse } from '@/api/user/type.ts'
// 获取token
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 路由常量
import { routes } from '@/router/router'

export const useUserStore = defineStore(
  'User',
  () => {
    // 路由常量
    const menuRoutes = ref(routes)
    // token
    const token = ref(GET_TOKEN())
    // 用户信息

    const userInfoData = ref({
      username: '',
      avatar: '',
    })
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
    //获取用户信息
    const userInfo = async () => {
      const res = await reqUserInfo()
      userInfoData.value.username = res.data.checkUser.username
      userInfoData.value.avatar = res.data.checkUser.avatar
    }
    // 退出登录
    const logout = () => {
      // 清除token，userInfoData
      token.value = ''
      userInfoData.value.username = ''
      userInfoData.value.avatar = ''
      REMOVE_TOKEN()
    }
    return {
      // state
      menuRoutes,
      token,
      userInfoData,
      // action
      userLogin,
      userInfo,
      logout,
      // getters
    }
  },
  {
    persist: true,
  },
)
