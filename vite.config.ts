/// <reference types="vitest" />

import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    include: ["lib/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
  build: {
    lib: {
      entry: "./lib/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "./dist/",
    modulePreload: false,
    copyPublicDir: false,
    rollupOptions: {
      external: ["axios"],
    },
  },
  plugins: [dts({ tsconfigPath: "./tsconfig.lib.json" }), checker({ typescript: true }), tsconfigPaths()],
});
