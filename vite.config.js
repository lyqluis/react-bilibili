import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { visualizer } from "rollup-plugin-visualizer"
import { compression } from "vite-plugin-compression2"
import { createHtmlPlugin } from "vite-plugin-html"
import { viteExternalsPlugin } from "vite-plugin-externals"

const env = loadEnv("development", process.cwd())

// https://vitejs.dev/config/
/* eslint-disable-next-line no-unused-vars */
export default defineConfig(({ mode }) => {
	// import.meta.env.VITE_APP_API_HOME doesn't work in the vite config file
	// const env = loadEnv(mode, process.cwd(), '')

	return {
		base: "./",
		plugins: [
			react(),
			createSvgIconsPlugin({
				// Specify the icon folder to be cached
				iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
				// Specify symbolId format
				symbolId: "icon-[dir]-[name]",
			}),
			viteExternalsPlugin({
				react: "React",
				"react-dom": "ReactDOM",
				redux: "Redux",
				axios: "axios",
			}),
			createHtmlPlugin({
				minify: true,
				inject: {
					data: {
						reactScript:
							'<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
						reactDomScript:
							'<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
						reduxScript:
							'<script src="https://unpkg.com/redux@4.2.1/dist/redux.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
						axiosScript:
							'<script src="https://unpkg.com/axios@1.3.6/dist/axios.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>',
						title: "<title>react-bilibili-app</title>",
					},
				},
			}),
			compression({
				verbose: true, // 是否在控制台中输出压缩结果
				disable: false,
				threshold: 10240, // 如果体积大于阈值，将被压缩，单位为 b，体积过小时请不要压缩，以免适得其反
				algorithm: "gzip", // 压缩算法，可选 ['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
				ext: ".gz",
				deleteOriginFile: true, // 源文件压缩后是否删除 (为了看压缩后的效果，先选择了 true)
			}),
			visualizer({ open: true }),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		css: {
			postcss: {
				plugins: [
					postcsspxtoviewport8plugin({
						viewportWidth: 375,
					}),
				],
			},
		},
		server: {
			// proxy: {
			//   '/api': {
			//     target: env.VITE_APP_API,
			//     changeOrigin: true,
			//     rewrite: (path) => path.replace(/^\/api/, '')
			//   }
		},
		build: {
			rollupOptions: {
				// output: {
				// 	chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
				// 	entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
				// 	assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
				// },
			},
			minify: "terser", // 改为 terser
			terserOptions: {
				// 新增 terser 配置
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
	}
})
