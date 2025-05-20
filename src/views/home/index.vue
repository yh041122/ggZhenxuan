<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
defineOptions({
  name: 'homeIndex',
})
onMounted(() => {
  userStore.userInfo()
})
</script>
<template>
  <div>
    <img :src="userStore.userInfoData.avatar" alt="" />
  </div>
</template>
<style scoped lang="scss"></style>
