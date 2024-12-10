import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { presetUno } from "unocss";

const getTarget = () => {
  return (
    "http://127.0.0.1:4523/m1/2681866-2570449-default" || "https://tv.iwei.xyz"
  );
};

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "/Users/wangshunping/products/tv",
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/v1/": {
        target: getTarget(),
        changeOrigin: true,
      },
      "/videos/": {
        target: "https://tv.iwei.xyz",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    UnoCSS({
      presets: [presetUno()],
    }),
    vue(),
  ],
});
