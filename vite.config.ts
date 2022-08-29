import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
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
