<script setup lang="ts">
defineOptions({
  name: 'loginIndex',
})
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
const formData = ref({
  username: 'admin',
  password: '111111',
})
</script>
<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :sx="0"></el-col>
      <el-col :span="12" :sx="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input :prefix-icon="User" type="text" v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              :prefix-icon="Lock"
              type="password"
              :show-password="true"
              v-model="formData.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    height: 30vh;
    top: 30vh;
    padding: 40px;
    background: url('@/assets/images/login_form.png') no-repeat;
    h1 {
      font-size: 40px;
      color: #fff;
    }
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 10px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
