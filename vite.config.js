import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [sveltekit({ configFile: "svelte.config.js" })],
  server: {
    fs: {
      allow: [".."],
    },
  },
  legacy: { buildSsrCjsExternalHeuristics: true },
});