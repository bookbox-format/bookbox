import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    charset: "utf8",
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "bookbox-docs",
      formats: ["es", "cjs"],
      fileName: (format) => `docs.${format}.js`,
    },
  },
});
