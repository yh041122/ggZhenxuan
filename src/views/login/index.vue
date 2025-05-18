<script setup lang="ts">
defineOptions({
  name: 'loginIndex',
})
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
// 获取当前时间段 早上 |上午 |中午|下午 |晚上
import { getTime } from '@/utils/time.ts'
// 用户小仓库
import { useUserStore } from '@/stores/modules/user.ts'
const userStore = useUserStore()
// 路由
import { useRouter } from 'vue-router'
const router = useRouter()
// element-plus
import { ElNotification } from 'element-plus'
// 表单数据
const formData = ref({
  username: 'admin',
  password: '111111',
})
// 表单检验对象
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' },
  ],
}
// 表单对象
const loginForm = ref()
// 按钮加载效果
const loading = ref(false)
// 登录
const login = async () => {
  // 校验表单
  await loginForm.value?.validate()

  // 按钮加载效果
  loading.value = true
  // 登录逻辑
  try {
    await userStore.userLogin(formData.value)
    loading.value = false
    router.push('/')
    ElNotification({
      title: `Hi,${getTime()}好~`,
      message: '欢迎回来',
      type: 'success',
    })
  } catch (error) {
    // 登录失败 加载效果小时
    loading.value = false
    ElNotification({
      message: (error as Error).message,
      type: 'error',
    })
    console.log(error)
  }
}
</script>
<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :sx="0"></el-col>
      <el-col :span="12" :sx="24">
        <el-form class="login_form" :model="formData" :rules="rules" ref="loginForm">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item class="login_form_item" prop="username">
            <el-input
              :prefix-icon="User"
              type="text"
              v-model="formData.username"
              class="login_input"
            ></el-input>
          </el-form-item>
          <el-form-item class="login_form_item" prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              :show-password="true"
              v-model="formData.password"
              class="login_input"
            ></el-input>
          </el-form-item>
          <el-form-item class="login_form_item">
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    height: 100%;
    top: 30vh;
    padding: 40px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    .login_form_item {
      width: 100%;
    }
    .login_input {
      width: 100%;
    }
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
