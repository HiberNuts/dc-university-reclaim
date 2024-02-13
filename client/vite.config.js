import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), compression()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    build: {
      sourcemap: "hidden"
    }
  }
})
