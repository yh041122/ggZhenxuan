<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<template>
  <svg-icon name="timer" color="red" width="100px" height="100px"></svg-icon>
  <RouterView />
</template>

<style scoped></style>
