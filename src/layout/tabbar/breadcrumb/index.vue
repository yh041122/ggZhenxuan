<script setup lang="ts">
defineOptions({
  name: 'breadcrumbIndex',
})
// 引入仓库
import { useLayoutSettingStore } from '@/stores/modules/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()
// 引入icon组件
import { Expand, Fold } from '@element-plus/icons-vue'
// 修改图标
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>
<template>
  <!-- 图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? Expand : Fold"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="DArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped lang="scss"></style>
