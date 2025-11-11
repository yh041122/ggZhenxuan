import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// element-plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// mock插件
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
// mode：当前模式（如 development 或 production）。
// command：当前命令（如 serve 或 build）
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueDevTools(),
      // vite-plugin-mock插件
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
      // element-plus按需引入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        //svg图标存储在src/assets/icons
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // scss全局变量配置 可以使用variable.scss中的scss变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写  把 /api 替换成 ''
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
