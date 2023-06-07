import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const env = loadEnv('development', process.cwd())

// https://vitejs.dev/config/
/* eslint-disable-next-line no-unused-vars */
export default defineConfig(({ mode }) => {
  // import.meta.env.VITE_APP_API_HOME doesn't work in the vite config file
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            viewportWidth: 375
          })
        ]
      }
    },
    server: {
      // proxy: {
      //   '/api': {
      //     target: env.VITE_APP_API,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   },
      //   '/mockapi': {
      //     target: env.VITE_APP_API_HOME,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/mockapi/, '')
      //   }
      // }
    }
  }
})
