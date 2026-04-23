import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  // GitHub Pages project site base:
  // https://lakshu255.github.io/Local-Pollution-Report-UI/
  base: mode === "production" ? "/Local-Pollution-Report-UI/" : "/",

  plugins: [react(), tailwindcss(), viteSingleFile()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
