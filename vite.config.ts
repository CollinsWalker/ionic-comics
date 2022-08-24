import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { viteVConsole } from 'vite-plugin-vconsole'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env, 'env')
  console.log(command, 'command')
  console.log(mode, 'mode')
  console.log('=======================')
  console.log(mode, '环境')
  return {
    plugins: [
      vue(),
      // VConsole 调试工具配置，若没有此配置，则调试工具控制台不会打印日志
      viteVConsole({
        entry: [path.resolve('src/main.ts')], // 每个页面的入口文件，和上面不一样的地方，这里是一个数组
        localEnabled: false, // 本地是否启用
        enabled: mode === 'sit', // 是否启用
        config: {
          maxLogNumber: 1000,
          theme: 'light' // 主题颜色
        }
      })
    ],
    resolve: {
      alias: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      host: '0.0.0.0', // 解决不能通过ip访问
      // cors: true, // 默认启用并允许任何源
      proxy: {
        '/api': {
          target: env.VITE_APP_URL, //请求地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      terserOptions: {
        compress: {
          // 生产环境去除打包以及debugger
          // drop_debugger: true,
          // drop_console: true
        }
      }
    }
  }
})
