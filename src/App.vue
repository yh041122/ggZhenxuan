<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { reqLogin } from '@/api/user'
onMounted(async () => {
  const res = await reqLogin({ username: 'admin', password: '111111' })
  console.log(res)
})
</script>
<template>
  <div>
    <RouterView />
  </div>
</template>
<style scoped lang="scss"></style>
