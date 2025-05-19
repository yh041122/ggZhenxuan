<script setup lang="ts">
defineOptions({
  name: 'settingIndex',
})
</script>
<template>
  <el-button size="small" icon="Refresh" circle></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
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
