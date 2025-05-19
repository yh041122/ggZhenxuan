<script setup lang="ts">
defineOptions({
  name: 'menuComponent',
})
import { useRouter, type RouteRecordRaw } from 'vue-router'
interface menuProps {
  menuList: RouteRecordRaw[]
}
defineProps<menuProps>()
// 二级路由跳转
const router = useRouter()
const goRoute = (cv: any) => {
  console.log(cv.index)
  router.push({ path: cv.index })
}
</script>
<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta!.hidden"
        :index="item.path"
        @click="goRoute"
        class="marginLeft"
      >
        <el-icon>
          <component :is="item.meta!.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta!.hidden"
        :index="item.children[0].path"
        @click="goRoute"
        class="marginLeft"
      >
        <el-icon>
          <component :is="item.children[0].meta!.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta!.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.meta!.hidden" :index="item.path" class="marginLeft">
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
<style scoped lang="scss">
.marginLeft {
  margin-left: -3px;
}
</style>
