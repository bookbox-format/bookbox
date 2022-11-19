import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile({useRecommendedBuildConfig: true})],
  root: './preparedTemplate/src',
  build: {
    outDir: './dist',
    emptyOutDir: true,
  }
});
