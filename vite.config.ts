/// <reference types="vitest" />

import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

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
    // rollupOptions: {
    //   external: ["axios", "crypto-js"],
    // },
  },
  plugins: [dts({ tsconfigPath: "./tsconfig.lib.json" }), checker({ typescript: true }), externalizeDeps()],
});
