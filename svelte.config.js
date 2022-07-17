import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    enableSourcemap: true
  },
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    sourceMap: true
  }),
  kit: {
    adapter: adapter({
      // default options are shown
      out: "build",
      precompress: true,
    }),
    browser: {
      hydrate: true,
    },
  },
  vite: { css: { devSourcemap: true }, ssr: {
    noExternal: ["swiper"]
  } }
};

export default config;
