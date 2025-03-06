import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    port: 4500,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: "all",
  },
});
