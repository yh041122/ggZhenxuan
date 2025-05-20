<script setup lang="ts">
defineOptions({
  name: 'layoutIndex',
})
// layoutSetting仓库
import { useLayoutSettingStore } from '@/stores/modules/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()
// route
import { useRoute } from 'vue-router'
// logo组件
import logoComponent from './logo/index.vue'
// menu组件
import menuComponent from './menu/index.vue'
// main组件
import Main from './main/index.vue'
// tabbar组件
import Tabbar from './tabbar/index.vue'
// 获取user的小仓库
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
// 默认激活 给menu添加 :default-active="$route.path" 在哪个二级路由刷新，左侧菜单栏对应保持展开
// default-active 页面加载时默认激活菜单的index
const $route = useRoute()
</script>
<template>
  <div class="layout_container">
    <!-- 左侧菜单-->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
      <logoComponent />
      <el-scrollbar class="scrollbar">
        <el-menu
          class="layout_menu"
          background-color="rgb(  0, 22, 42)"
          text-color="#fff"
          :unique-opened="true"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold ? true : false"
        >
          <menuComponent :menuList="userStore.menuRoutes"></menuComponent>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航-->
    <div class="layout_tabbar" :class="{ tabbarFold: layoutSettingStore.fold }">
      <Tabbar />
    </div>
    <!-- 内容区域 -->
    <div class="layout_main" :class="{ mainFold: layoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout_container {
  position: relative;
  width: 100%;
  height: 100vh;
  // 左侧菜单
  .layout_slider {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-bgc;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100% - $base-menu-logo-height);
      .layout_menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-fold-width;
    }
  }
  // 顶部导航
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.tabbarFold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
  // 内容区域
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    background-color: yellowgreen;
    padding: 20px;
    transition: all 0.3s;
    // 内容超出宽度 使用滚动条
    overflow: auto;
    &.mainFold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
}
</style>
