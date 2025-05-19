<script setup lang="ts">
defineOptions({
  name: 'layoutTabbarIndex',
})
// 左侧面包屑组件
import breadCrumb from './breadcrumb/index.vue'
// 右侧业务组件
import setting from './setting/index.vue'
</script>
<template>
  <div class="tabbar_container">
    <div class="tabbar_left">
      <breadCrumb />
    </div>
    <div class="tabbar_right">
      <setting />
    </div>
  </div>
</template>
<style scoped lang="scss">
.tabbar_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  .tabbar_left {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
