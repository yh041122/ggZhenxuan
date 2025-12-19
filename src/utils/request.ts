import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'

// 使用axios对象的create方法创造axios实例(其他的配置：基础路径、超时的时间)
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会带/api
  // 超时时间
  timeout: 5000, //超时时间5秒 发起的请求必须在5秒内搞定
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  // 返回配置对象 config,headers属性请求头
  // 给请求头添加token
  const token = userStore.token
  if (token) {
    config.headers.token = token
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // response 服务器返回的数据
    // 成功的回调
    return response.data //简化数据
  },
  (error) => {
    // 失败的回调：处理http网络错误
    //定义一个变量：存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN失效，请重新登录'
        break
      case 403:
        message = '没有权限访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        console.log(error)

        message = error.message
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error) //返回一个失败的promise对象
  },
)
export default request
