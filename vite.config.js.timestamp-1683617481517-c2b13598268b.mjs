// vite.config.js
import { defineConfig, loadEnv } from "file:///Users/GULA/Desktop/react-bilibili-app/node_modules/.pnpm/vite@4.3.0/node_modules/vite/dist/node/index.js";
import react from "file:///Users/GULA/Desktop/react-bilibili-app/node_modules/.pnpm/@vitejs+plugin-react@4.0.0-beta.0_vite@4.3.0/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import postcsspxtoviewport8plugin from "file:///Users/GULA/Desktop/react-bilibili-app/node_modules/.pnpm/postcss-px-to-viewport-8-plugin@1.2.2/node_modules/postcss-px-to-viewport-8-plugin/lib/index.js";
import { createSvgIconsPlugin } from "file:///Users/GULA/Desktop/react-bilibili-app/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.0/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/GULA/Desktop/react-bilibili-app";
var env = loadEnv("development", process.cwd());
console.log(env);
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
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
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvR1VMQS9EZXNrdG9wL3JlYWN0LWJpbGliaWxpLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL0dVTEEvRGVza3RvcC9yZWFjdC1iaWxpYmlsaS1hcHAvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL0dVTEEvRGVza3RvcC9yZWFjdC1iaWxpYmlsaS1hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBwb3N0Y3NzcHh0b3ZpZXdwb3J0OHBsdWdpbiBmcm9tICdwb3N0Y3NzLXB4LXRvLXZpZXdwb3J0LTgtcGx1Z2luJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbmNvbnN0IGVudiA9IGxvYWRFbnYoJ2RldmVsb3BtZW50JywgcHJvY2Vzcy5jd2QoKSlcbmNvbnNvbGUubG9nKGVudilcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAvLyBpbXBvcnQubWV0YS5lbnYuVklURV9BUFBfQVBJX0hPTUUgZG9lc24ndCB3b3JrIGluIHRoZSB2aXRlIGNvbmZpZyBmaWxlXG4gIC8vIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAvLyBTcGVjaWZ5IHRoZSBpY29uIGZvbGRlciB0byBiZSBjYWNoZWRcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIHBvc3Rjc3NweHRvdmlld3BvcnQ4cGx1Z2luKHtcbiAgICAgICAgICAgIHZpZXdwb3J0V2lkdGg6IDM3NVxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgLy8gcHJveHk6IHtcbiAgICAgIC8vICAgJy9hcGknOiB7XG4gICAgICAvLyAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJLFxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgICcvbW9ja2FwaSc6IHtcbiAgICAgIC8vICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9BUElfSE9NRSxcbiAgICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL21vY2thcGkvLCAnJylcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsU0FBUyxjQUFjLGVBQWU7QUFDMVUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdDQUFnQztBQUN2QyxTQUFTLDRCQUE0QjtBQUpyQyxJQUFNLG1DQUFtQztBQU16QyxJQUFNLE1BQU0sUUFBUSxlQUFlLFFBQVEsSUFBSSxDQUFDO0FBQ2hELFFBQVEsSUFBSSxHQUFHO0FBSWYsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFJeEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04scUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxRQUUxRCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLFVBQ1AsMkJBQTJCO0FBQUEsWUFDekIsZUFBZTtBQUFBLFVBQ2pCLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWFSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
