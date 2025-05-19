<script setup lang="ts">
defineOptions({
  name: 'mainIndex',
})
import { watch, ref, nextTick } from 'vue'
// layoutSetting仓库
import { useLayoutSettingStore } from '@/stores/modules/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()
// 刷新组件
const flag = ref(true)
// 监听layoutSetting仓库中refsh变化
watch(
  () => layoutSettingStore.refsh,
  () => {
    //refsh被点击了(变化了) 就要刷新
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<template>
  <!-- 二级路由 并添加过度 -->
  <router-view v-slot="{ Component }">
    <!-- vue 内置组件 -->
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<style scoped lang="scss">
// 为vue内置组件 transition添加过渡效果
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.4s ease;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
