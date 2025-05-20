<script setup lang="ts">
defineOptions({
  name: 'homeIndex',
})
</script>
<template>
  <div>
    <img :src="userStore.userInfoData.avatar" alt="" />
  </div>
</template>
<style scoped lang="scss"></style>
