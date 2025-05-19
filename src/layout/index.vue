<script setup lang="ts">
defineOptions({
  name: 'layoutIndex',
})
// logo组件
import logoComponent from './logo/index.vue'
</script>
<template>
  <div class="layout_container">
    <!-- 左侧菜单-->
    <div class="layout_slider">
      <logoComponent />
    </div>
    <!-- 顶部导航-->
    <div class="layout_tabbar">456</div>
    <!-- 内容区域 -->
    <div class="layout_main">
      <p style="height: 10000px; background-color: red">789</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout_container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: red;
  // 左侧菜单
  .layout_slider {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-bgc;
  }
  // 顶部导航
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: cyan;
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
    // 内容超出宽度 使用滚动条
    overflow: auto;
  }
}
</style>
