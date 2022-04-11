import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    devSourcemap: true
  }),
  kit: {
    adapter: adapter({
      // default options are shown
      out: "build",
      precompress: false,
    }),
    browser: {
      hydrate: true,
    },
    vite: {
      css: {
        devSourcemap: true
      }
    }
  }
};

export default config;
