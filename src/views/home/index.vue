<script setup lang="ts">
defineOptions({
  name: 'homeIndex',
})
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
</script>
<template>
  <div>
    <img :src="userStore.userInfoData.avatar" alt="" />
  </div>
</template>
<style scoped lang="scss"></style>
