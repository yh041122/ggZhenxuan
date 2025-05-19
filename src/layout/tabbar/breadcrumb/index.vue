<script setup lang="ts">
defineOptions({
  name: 'breadcrumbIndex',
})
</script>
<template>
  <!-- 图标 -->
  <el-icon style="margin-right: 10px"><Expand /></el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="DArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped lang="scss"></style>
