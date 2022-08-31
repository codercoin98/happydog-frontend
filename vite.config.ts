import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3001,
    proxy:{
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/,'')
      }
    }
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/less/index.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
