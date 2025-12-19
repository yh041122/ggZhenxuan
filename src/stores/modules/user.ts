// 用户小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue' //数据要有响应式特性
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入接口数据类型
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from '@/api/user/type'
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
    const userLogin = async (data: LoginFormData) => {
      const res: LoginResponseData = await reqLogin(data)
      // 登录成功200->token
      if (res.code === 200) {
        // 存储到user仓库
        token.value = res.data
        // 本地存储持久化
        SET_TOKEN(token.value)
        return 'ok'
      }
      // 登录失败201->错误信息
      else {
        return Promise.reject(new Error(res.data))
      }
    }
    //获取用户信息
    const userInfo = async () => {
      const res: UserInfoResponseData = await reqUserInfo()

      // 获取成功200->token
      if (res.code === 200) {
        userInfoData.value.username = res.data.name
        userInfoData.value.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    // 退出登录
    const logout = async () => {
      const res: any = await reqLogout()
      // 登录成功
      if (res.code === 200) {
        // 清除token，userInfoData
        token.value = ''
        userInfoData.value.username = ''
        userInfoData.value.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
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
