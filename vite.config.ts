import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginHtmlEnv from "vite-plugin-html-env";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
    ],
  },
  plugins: [
    react(),
    // 환경변수 셋팅
    VitePluginHtmlEnv(),
    // 환경변수 셋팅
    VitePluginHtmlEnv({
      compiler: true,
      // compiler: false // old
    }),
  ],
});
