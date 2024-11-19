import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { presetUno } from "unocss";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "/Users/wangshunping/products/tv",
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      '/v1/': {
        target: 'https://tv.iwei.xyz',
        changeOrigin: true,
      },
      '/videos/': {
        target: 'https://tv.iwei.xyz',
        changeOrigin: true,
      },
    }
  },
  plugins: [
    UnoCSS({
      presets: [presetUno()],
    }),
    vue(),
  ],
});
