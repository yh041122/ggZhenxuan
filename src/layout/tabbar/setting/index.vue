<script setup lang="ts">
import { useLayoutSettingStore } from '@/stores/modules/layoutSetting'
import { useUserStore } from '@/stores/modules/user'
// 引入路由器对象
// 引入路由对象
import { useRoute, useRouter } from 'vue-router'

const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
defineOptions({
  name: 'settingIndex',
})
// 刷新按钮
const refshFn = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
// 全屏按钮
const FullScreen = () => {
  // 如果当前页面全屏：true ，否则false
  const full = document.fullscreenElement
  // 切换为全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  }
  // 退出全屏
  else {
    document.exitFullscreen()
  }
}
// 退出登录
const logout = async () => {
  // 调用仓库的退出登录方法-清除数据
  await userStore.logout()
  // 跳转登录页
  console.log($route)
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<template>
  <el-button size="small" icon="Refresh" circle @click="refshFn"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="FullScreen"></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.userInfoData.avatar"
    class="atavar"
    style="
      width: 20px;
      height: 20px;
      background-color: red;
      border-radius: 50%;
      margin-left: 10px;
      margin-right: 10px;
    "
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style scoped lang="scss"></style>
