import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dir = path.dirname(fileURLToPath(import.meta.url));
const kitRoot = path.resolve(dir, "..");

export default defineConfig({
  root: dir,
  plugins: [react()],
  css: {
    postcss: path.join(dir, "postcss.config.cjs"),
  },
  resolve: {
    alias: {
      "@uink/ui": path.join(kitRoot, "src/index.ts"),
    },
  },
  server: {
    port: 5177,
    fs: { allow: [kitRoot] },
  },
  build: {
    outDir: path.join(dir, "dist"),
    emptyOutDir: true,
  },
});
