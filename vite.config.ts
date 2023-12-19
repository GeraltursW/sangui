import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src/'),
//     }
//   },
//   server: {
//     host: '0.0.0.0',
//     port: import.meta.env.VITE_PORT,
//     // 是否开启 https
//     https: false,
//   },

// })
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [vue()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src/'),
      }
    },
      server: {
    host: '0.0.0.0',
    port: env.VITE_PORT,
    // 是否开启 https
    https: false,
  },
  }})