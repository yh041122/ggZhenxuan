<script setup lang="ts">
defineOptions({
  name: 'logoComponent',
})
// 引入logo配置
import setting from '@/setting'
</script>
<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-font-size;
    margin-left: 10px;
    font-weight: 600;
  }
}
</style>
