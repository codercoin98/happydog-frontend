import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        timeout: 5000,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/google': {
        target: 'https://www.googleapis.com/',
        timeout: 5000,
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google/, ''),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useForm', 'useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
