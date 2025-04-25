import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from 'vite-plugin-checker'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    checker({
      typescript: true
    })
  ],

  preview: {
    port: 4500,
    host: "0.0.0.0",
    allowedHosts: true,
    strictPort: true,
  },
});
