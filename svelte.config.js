import * as child_process from 'node:child_process';
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    enableSourcemap: true
  },
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess({
    sourceMap: true
  }),
  kit: {
    adapter: adapter({
      // default options are shown
      out: "build",
      precompress: true,
    }),
		version: {
			name: child_process.execSync('git rev-parse HEAD').toString().trim(),
      pollInterval: 2500
		},
  },
};


export default config;
