<script setup lang="ts">
defineOptions({
  name: 'menuComponent',
})
import type { RouteRecordRaw } from 'vue-router'
interface menuProps {
  menuList: RouteRecordRaw[]
}
defineProps<menuProps>()
</script>
<template>
  <template v-for="item in menuList">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta!.hidden" :key="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta!.icon"></component>
          </el-icon>
          <span>{{ item.meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item v-if="!item.children[0].meta!.hidden" :key="item.children[0].path">
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta!.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.meta!.hidden" :key="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta!.icon"></component>
          </el-icon>
          <span>{{ item.meta!.title }}</span>
        </template>
        <!-- 递归组件 -->
        <menuComponent :menuList="item.children"></menuComponent>
      </el-sub-menu>
    </template>
  </template>
</template>
<style scoped lang="scss"></style>
