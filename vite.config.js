/// <reference types="vitest" />
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [sveltekit({ configFile: "svelte.config.js" })],
  alias: {
    $app: "/node_modules/@sveltejs/kit/assets/app",
    $lib: "/src/lib",
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    sequence: {
      setupFiles: "List",
    },
    setupFiles: ["./setupTests.ts"],
    watchExclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**.spec.js",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**.spec.js",
    ],
  },
  legacy: { buildSsrCjsExternalHeuristics: true },
  build: {
    minify: true,
  },
});
