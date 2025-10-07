import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//import AutoImport from 'unplugin-auto-import/vite'
//import Components from 'unplugin-vue-components/vite'
//npm import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    /*AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),*/
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://47.99.206.67',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  proxy: {
    '/api/file/uploads': {
      target: 'http://47.99.206.67',  // 图片实际地址
      changeOrigin: true,
      pathRewrite: {
        '^/api/file/uploads': ''  // 去掉代理路径前缀
      }
    }
  },


  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
