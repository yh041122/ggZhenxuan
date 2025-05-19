<script setup lang="ts">
import { useLayoutSettingStore } from '@/stores/modules/layoutSetting'
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
</script>
<template>
  <el-button size="small" icon="Refresh" circle @click="refshFn"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="FullScreen"></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <div
    class="atavar"
    style="width: 20px; height: 20px; background-color: red; border-radius: 50%; margin-left: 10px"
  ></div>
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style scoped lang="scss"></style>
