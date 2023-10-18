import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configSvgIconsPlugin } from './vite/plugins/createSvgIcon'
import createUnoCSS from './vite/plugins/createUnoCSS'

const root = process.cwd()
const pathResolve = (pathname: string) => resolve(root, '.', pathname)
// https://vitejs.dev/config/
export default defineConfig({

  server: {
    host: true,
  },

  plugins: [
    vue(),
    vueJsx(),
    createUnoCSS(),
    configSvgIconsPlugin({ isBuild: false }),
  ],

  resolve: {
    // 配置别名
    alias: [
      {
        find: /\/@\//,
        replacement: `${pathResolve('src')}/`,
      },
      {
        find: /\/#\//,
        replacement: `${pathResolve('types')}/`,
      },
    ],
  },
})
