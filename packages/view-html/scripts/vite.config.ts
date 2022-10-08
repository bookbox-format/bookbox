import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile({useRecommendedBuildConfig: true})],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  }
});
