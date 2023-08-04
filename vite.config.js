import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入组件，不需要再手动写import
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'auto-imports.d.ts'
    }),
    // 自动导入组件，自定义组件库
    Components({
      // 指定组件所在文件夹的位置
      dirs: ['src/components'],
      // 文件扩展名
      extensions: ['vue'],
      // 配置type文件生成位置
      dts: 'components.d.ts'
    })
  ],
  // 与jsconfig.json对应，@表示src目录
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 默认自动打开/页面，但是必须已有浏览器被打开
  server: {
    host: '0.0.0.0',
    port: '5175',
    open: '/'
  }
})
