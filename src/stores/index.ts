// 大仓库
import { createPinia } from 'pinia'
// 可持续
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建大长裤
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 导出大仓库
export default pinia
