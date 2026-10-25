import * as child_process from "node:child_process";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig(() => ({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({
        // default options are shown
        out: "build",
        precompress: true,
      }),
      version: {
        name: child_process.execSync("git rev-parse HEAD").toString().trim(),
        pollInterval: 2500,
      },
    }),
    svelteTesting(),
  ],
  server: {
    fs: {
      allow: [".."],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts", "jest-canvas-mock"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**.spec.js",
    ],
  },
  build: {
    minify: true,
  },
}));
