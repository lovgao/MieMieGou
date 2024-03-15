import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入设置 插件：unplugin-vue-components 
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src'],
     // 组件的有效文件扩展名。
      extensions: ["vue"],
      // 搜索子目录
      deep: true,
      // vant  ui库解析器，也可以自定义
      resolvers: [VantResolver()],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
