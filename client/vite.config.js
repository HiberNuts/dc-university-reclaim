import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression()],
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      output: {
        // Set to true to enable code splitting
        manualChunks: {
          // Define your entry points and the chunks you want to create
          // Here, 'vendor' is a common name for external dependencies
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
