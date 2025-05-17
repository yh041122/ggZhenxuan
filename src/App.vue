<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from '@/api/user'
onMounted(async () => {
  const res = await reqLogin({ username: 'admin', password: '111111' })
  console.log(res)
})
</script>
<template>
  <div>根组件</div>
</template>
<style scoped lang="scss"></style>
