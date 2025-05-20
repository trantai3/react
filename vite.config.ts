import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), eslintPlugin()],
});
