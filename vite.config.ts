import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Spliteam",
        short_name: "spliteam",
        description: "A simple app to split your team",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/images/ios/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/ios/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
