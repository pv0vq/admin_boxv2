import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginHtmlEnv from "vite-plugin-html-env";

// https://vitejs.dev/config/
export default defineConfig({
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
