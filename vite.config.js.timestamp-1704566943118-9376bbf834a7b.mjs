// vite.config.js
import { sveltekit } from "file:///home/jaskaran/repos/enki-website/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///home/jaskaran/repos/enki-website/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
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
    alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
    setupFiles: ["./setupTests.ts", "jest-canvas-mock"],
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qYXNrYXJhbi9yZXBvcy9lbmtpLXdlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2phc2thcmFuL3JlcG9zL2Vua2ktd2Vic2l0ZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9qYXNrYXJhbi9yZXBvcy9lbmtpLXdlYnNpdGUvdml0ZS5jb25maWcuanNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tIFwiQHN2ZWx0ZWpzL2tpdC92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbc3ZlbHRla2l0KHsgY29uZmlnRmlsZTogXCJzdmVsdGUuY29uZmlnLmpzXCIgfSldLFxuICBhbGlhczoge1xuICAgICRhcHA6IFwiL25vZGVfbW9kdWxlcy9Ac3ZlbHRlanMva2l0L2Fzc2V0cy9hcHBcIixcbiAgICAkbGliOiBcIi9zcmMvbGliXCIsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGZzOiB7XG4gICAgICBhbGxvdzogW1wiLi5cIl0sXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICBhbGlhczogW3sgZmluZDogL15zdmVsdGUkLywgcmVwbGFjZW1lbnQ6IFwic3ZlbHRlL2ludGVybmFsXCIgfV0sXG4gICAgc2V0dXBGaWxlczogW1wiLi9zZXR1cFRlc3RzLnRzXCIsIFwiamVzdC1jYW52YXMtbW9ja1wiXSxcbiAgICB3YXRjaEV4Y2x1ZGU6IFtcbiAgICAgIFwiKiovbm9kZV9tb2R1bGVzLyoqXCIsXG4gICAgICBcIioqL2Rpc3QvKipcIixcbiAgICAgIFwiKiovY3lwcmVzcy8qKlwiLFxuICAgICAgXCIqKi8ue2lkZWEsZ2l0LGNhY2hlLG91dHB1dCx0ZW1wfS8qKlwiLFxuICAgICAgXCIqKi5zcGVjLmpzXCIsXG4gICAgXSxcbiAgICBleGNsdWRlOiBbXG4gICAgICBcIioqL25vZGVfbW9kdWxlcy8qKlwiLFxuICAgICAgXCIqKi9kaXN0LyoqXCIsXG4gICAgICBcIioqL2N5cHJlc3MvKipcIixcbiAgICAgIFwiKiovLntpZGVhLGdpdCxjYWNoZSxvdXRwdXQsdGVtcH0vKipcIixcbiAgICAgIFwiKiouc3BlYy5qc1wiLFxuICAgIF0sXG4gIH0sXG4gIGxlZ2FjeTogeyBidWlsZFNzckNqc0V4dGVybmFsSGV1cmlzdGljczogdHJ1ZSB9LFxuICBidWlsZDoge1xuICAgIG1pbmlmeTogdHJ1ZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsb0JBQW9CO0FBRzdCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxtQkFBbUIsQ0FBQyxDQUFDO0FBQUEsRUFDdkQsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLE9BQU8sQ0FBQyxJQUFJO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLE9BQU8sQ0FBQyxFQUFFLE1BQU0sWUFBWSxhQUFhLGtCQUFrQixDQUFDO0FBQUEsSUFDNUQsWUFBWSxDQUFDLG1CQUFtQixrQkFBa0I7QUFBQSxJQUNsRCxjQUFjO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUSxFQUFFLCtCQUErQixLQUFLO0FBQUEsRUFDOUMsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
