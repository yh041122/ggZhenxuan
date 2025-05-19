<script setup lang="ts">
defineOptions({
  name: 'breadcrumbIndex',
})

// 引入路由
import { useRoute } from 'vue-router'
const $route = useRoute()

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
    <!-- 在Vue中 v-if和v-for不能一起使用，因为v-if的优先级更高 -->
    <el-breadcrumb-item
      v-for="(route, index) in $route.matched"
      :key="index"
      class="bread"
      v-show="route.meta.title"
      :to="route.path"
    >
      <el-icon class="icon">
        <component :is="route.meta.icon" />
      </el-icon>
      <span style="margin-left: 4px">{{ route.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped lang="scss">
.bread {
  position: relative;
  .icon {
    position: relative;
    top: 2px;
  }
}
</style>
