<script setup lang="ts">
defineOptions({
  name: 'IndexPage', // Vue 3.3+ 支持
})
// 参数
defineProps({
  // xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 使用的图标名字
  name: {
    type: String,
  },
  // 图标颜色
  color: {
    type: String,
    default: '',
  },
  // 图标宽度
  width: {
    type: String,
    default: '16px',
  },
  // 图标高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>
<template>
  <svg :style="{ width: width, height: height }">
    <!-- svg:图标外层容器节点，内部需要与use标签结合使用 -->
    <!-- xlink:href: 指向svg文件的路径 -->
    <!-- 这里的fill需要删除svg图标原有的fill -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<style scoped lang="scss"></style>
