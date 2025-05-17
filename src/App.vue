<script setup lang="ts">
import request from './utils/request'
import { onMounted } from 'vue'

interface RequestConfig {
  url: string
  method: string
  data: {
    username: string
    password: string
  }
}
// 响应数据类型
interface LoginResponse {
  // 根据你的API实际返回结构定义
  data?: {
    token?: string
    userInfo?: {
      username: string
      // 其他用户信息字段
    }
  }
}
// 组件挂载完毕
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111',
    },
  } as RequestConfig)
    .then((res: LoginResponse) => {
      console.log(res)
    })
    .catch((err: Error) => {
      console.log(err)
    })
})
</script>

<template>
  <div>
    <h1>测试axios第二次封装</h1>
  </div>
</template>

<style scoped lang="scss"></style>
