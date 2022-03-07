import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import routify from '@roxi/routify/plugins/rollup';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import html from '@rollup/plugin-html';
import sveltePreprocess from 'svelte-preprocess';
import * as child from 'child_process';
import * as path from 'path';

const production = !process.env.ROLLUP_WATCH;
const currentDate = new Date().valueOf().toString();

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = child.spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.ts',
  inlineDynamicImports: true,
  output: [
    {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'public/build/bundle-' + currentDate + '.js',
      watch: {
        clearScreen: false,
      },
    },
    {
      file: 'public/index.html',
      plugins: [
        html({
          fileName: 'index.html',
          title: 'Enki',
          template: ({ attributes, title }) => `
<!DOCTYPE html>
<html lang="${attributes.html.lang}">
  <head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta name='description' content='Enki Jewellery & Craft Gallery shop in Kings Heath, Birmingham, UK'>
    <title>${title}</title>
    
    <link rel='icon' type='image/png' href='/enki_icon.jpg'>
    <link rel='stylesheet' href='/global.css'>
    <link rel='stylesheet' href='/build/bundle-${currentDate}.css'>
    <link rel='preload' href='//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7_dtp.css' as='style' onload='this.onload=null;this.rel="stylesheet"'>
    <link rel='preload' href='/fonts/CaviarDreams.ttf' as='font' type='font/ttf' crossorigin >
    <link rel='preload' href='/fonts/enki-regular.ttf' as='font' type='font/ttf' crossorigin >
    <link rel='preconnect' href='https://enki.imgix.net'> 
    <link rel='preconnect' href='https://server.enki.jobspeed.uk'> 
    <link rel='preconnect' href='https://plausible.io'> 
    <link rel='preconnect' href='https://tickettailor.com'> 

    <script defer src='/build/bundle-${currentDate}.js'></script>
    <script defer data-domain='enki.jobspeed.uk' src='https://plausible.io/js/plausible.js'></script>
    <script
      defer
      src='https://cdn.tickettailor.com/js/widgets/min/widget.js'
      data-url='https://www.tickettailor.com/all-tickets/enki/'
      data-type='inline'
      data-inline-minimal='false'
      data-inline-show-logo='true'
      data-inline-bg-fill='false'
      data-inline-inherit-ref-from-url-param=''
      data-inline-ref='website_widget'>
    </script>
  </head>
  <body>
  </body>
</html>`,
        }),
      ],
    },
  ],
  plugins: [
    routify({ singleBuild: production }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('build/bundle-' + currentDate + '.css');
      },
      preprocess: sveltePreprocess({
        babel: {
          presets: [
            [
              '@babel/preset-env',
              {
                loose: true,
                // No need for babel to resolve modules
                modules: false,
                targets: {
                  // ! Very important. Target es6+
                  esmodules: true,
                },
              },
            ],
          ],
        },
      }),
    }),
    alias({
      entries: [
        { find: /^@\/(.*)$/, replacement: path.resolve(__dirname) + '/src/$1' },
      ],
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    replace({
      'process.env.SERVER_URL': production
        ? JSON.stringify('https://server.enki.jobspeed.uk')
        : JSON.stringify('http://localhost:8080'),
      'process.env.STRIPE_KEY': JSON.stringify(
        'pk_test_51HpvnTAk37gvJ51oYwywMtrDcDlL6FXuVY0aQ1EYEJUiw9MG70UElEMhhazqhhafUOslK1IugHRApQ7GWNUcnqT400dJ4HWjbp'
      ),
      'process.env.JEWELLERY_CATEGORY_ID': JSON.stringify('1875996'),
      'process.env.NODE_ENV': production
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      'process.env.GROUP_CLASSES_ID': JSON.stringify('2735617'),
      'process.env.CLASSES_ID': JSON.stringify('2735613'),
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
};
