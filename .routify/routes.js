/**
 * @roxi/routify 2.7.3
 * File generated Wed Nov 03 2021 08:59:15 GMT+0000 (Greenwich Mean Time)
 */

export const __version = '2.7.3';
export const __timestamp = '2021-11-03T08:59:15.928Z';

//buildRoutes
import { buildClientTree } from '@roxi/routify/runtime/buildRoutes';

//imports

//options
export const options = {};

//tree
export const _tree = {
  name: '_layout',
  filepath: '/_layout.svelte',
  root: true,
  ownMeta: {},
  absolutePath: '/home/jaskaran/repos/enki-website/src/pages/_layout.svelte',
  children: [
    {
      isFile: true,
      isDir: true,
      file: '_layout.svelte',
      filepath: '/classes/_layout.svelte',
      name: '_layout',
      ext: 'svelte',
      badExt: false,
      absolutePath:
        '/home/jaskaran/repos/enki-website/src/pages/classes/_layout.svelte',
      children: [
        {
          isFile: true,
          isDir: false,
          file: 'index.svelte',
          filepath: '/classes/index.svelte',
          name: 'index',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/classes/index.svelte',
          importPath: '../src/pages/classes/index.svelte',
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/classes/index',
          id: '_classes_index',
          component: () =>
            import('../src/pages/classes/index.svelte').then((m) => m.default),
        },
      ],
      isLayout: true,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      importPath: '../src/pages/classes/_layout.svelte',
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/classes',
      id: '_classes__layout',
      component: () =>
        import('../src/pages/classes/_layout.svelte').then((m) => m.default),
    },
    {
      isFile: true,
      isDir: true,
      file: '_layout.svelte',
      filepath: '/contact/_layout.svelte',
      name: '_layout',
      ext: 'svelte',
      badExt: false,
      absolutePath:
        '/home/jaskaran/repos/enki-website/src/pages/contact/_layout.svelte',
      children: [
        {
          isFile: true,
          isDir: false,
          file: 'index.svelte',
          filepath: '/contact/index.svelte',
          name: 'index',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/contact/index.svelte',
          importPath: '../src/pages/contact/index.svelte',
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/contact/index',
          id: '_contact_index',
          component: () =>
            import('../src/pages/contact/index.svelte').then((m) => m.default),
        },
      ],
      isLayout: true,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      importPath: '../src/pages/contact/_layout.svelte',
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/contact',
      id: '_contact__layout',
      component: () =>
        import('../src/pages/contact/_layout.svelte').then((m) => m.default),
    },
    {
      isFile: true,
      isDir: false,
      file: 'index.svelte',
      filepath: '/index.svelte',
      name: 'index',
      ext: 'svelte',
      badExt: false,
      absolutePath: '/home/jaskaran/repos/enki-website/src/pages/index.svelte',
      importPath: '../src/pages/index.svelte',
      isLayout: false,
      isReset: false,
      isIndex: true,
      isFallback: false,
      isPage: true,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/index',
      id: '_index',
      component: () =>
        import('../src/pages/index.svelte').then((m) => m.default),
    },
    {
      isFile: true,
      isDir: true,
      file: '_layout.svelte',
      filepath: '/online-shop/_layout.svelte',
      name: '_layout',
      ext: 'svelte',
      badExt: false,
      absolutePath:
        '/home/jaskaran/repos/enki-website/src/pages/online-shop/_layout.svelte',
      children: [
        {
          isFile: true,
          isDir: false,
          file: '[category].svelte',
          filepath: '/online-shop/[category].svelte',
          name: '[category]',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/online-shop/[category].svelte',
          importPath: '../src/pages/online-shop/[category].svelte',
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/online-shop/:category',
          id: '_onlineShop__category',
          component: () =>
            import('../src/pages/online-shop/[category].svelte').then(
              (m) => m.default
            ),
        },
        {
          isFile: false,
          isDir: true,
          file: 'basket',
          filepath: '/online-shop/basket',
          name: 'basket',
          ext: '',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/online-shop/basket',
          children: [
            {
              isFile: true,
              isDir: false,
              file: 'index.svelte',
              filepath: '/online-shop/basket/index.svelte',
              name: 'index',
              ext: 'svelte',
              badExt: false,
              absolutePath:
                '/home/jaskaran/repos/enki-website/src/pages/online-shop/basket/index.svelte',
              importPath: '../src/pages/online-shop/basket/index.svelte',
              isLayout: false,
              isReset: false,
              isIndex: true,
              isFallback: false,
              isPage: true,
              ownMeta: {},
              meta: {
                recursive: true,
                preload: false,
                prerender: true,
              },
              path: '/online-shop/basket/index',
              id: '_onlineShop_basket_index',
              component: () =>
                import('../src/pages/online-shop/basket/index.svelte').then(
                  (m) => m.default
                ),
            },
          ],
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: false,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/online-shop/basket',
        },
        {
          isFile: true,
          isDir: false,
          file: 'index.svelte',
          filepath: '/online-shop/index.svelte',
          name: 'index',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/online-shop/index.svelte',
          importPath: '../src/pages/online-shop/index.svelte',
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/online-shop/index',
          id: '_onlineShop_index',
          component: () =>
            import('../src/pages/online-shop/index.svelte').then(
              (m) => m.default
            ),
        },
        {
          isFile: false,
          isDir: true,
          file: 'product',
          filepath: '/online-shop/product',
          name: 'product',
          ext: '',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/online-shop/product',
          children: [
            {
              isFile: true,
              isDir: false,
              file: '[product].svelte',
              filepath: '/online-shop/product/[product].svelte',
              name: '[product]',
              ext: 'svelte',
              badExt: false,
              absolutePath:
                '/home/jaskaran/repos/enki-website/src/pages/online-shop/product/[product].svelte',
              importPath: '../src/pages/online-shop/product/[product].svelte',
              isLayout: false,
              isReset: false,
              isIndex: false,
              isFallback: false,
              isPage: true,
              ownMeta: {},
              meta: {
                recursive: true,
                preload: false,
                prerender: true,
              },
              path: '/online-shop/product/:product',
              id: '_onlineShop_product__product',
              component: () =>
                import(
                  '../src/pages/online-shop/product/[product].svelte'
                ).then((m) => m.default),
            },
          ],
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: false,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/online-shop/product',
        },
        {
          isFile: false,
          isDir: true,
          file: 'tag',
          filepath: '/online-shop/tag',
          name: 'tag',
          ext: '',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/online-shop/tag',
          children: [
            {
              isFile: true,
              isDir: false,
              file: '[tag].svelte',
              filepath: '/online-shop/tag/[tag].svelte',
              name: '[tag]',
              ext: 'svelte',
              badExt: false,
              absolutePath:
                '/home/jaskaran/repos/enki-website/src/pages/online-shop/tag/[tag].svelte',
              importPath: '../src/pages/online-shop/tag/[tag].svelte',
              isLayout: false,
              isReset: false,
              isIndex: false,
              isFallback: false,
              isPage: true,
              ownMeta: {},
              meta: {
                recursive: true,
                preload: false,
                prerender: true,
              },
              path: '/online-shop/tag/:tag',
              id: '_onlineShop_tag__tag',
              component: () =>
                import('../src/pages/online-shop/tag/[tag].svelte').then(
                  (m) => m.default
                ),
            },
          ],
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: false,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/online-shop/tag',
        },
      ],
      isLayout: true,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      importPath: '../src/pages/online-shop/_layout.svelte',
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/online-shop',
      id: '_onlineShop__layout',
      component: () =>
        import('../src/pages/online-shop/_layout.svelte').then(
          (m) => m.default
        ),
    },
    {
      isFile: true,
      isDir: true,
      file: '_layout.svelte',
      filepath: '/payment/_layout.svelte',
      name: '_layout',
      ext: 'svelte',
      badExt: false,
      absolutePath:
        '/home/jaskaran/repos/enki-website/src/pages/payment/_layout.svelte',
      children: [
        {
          isFile: true,
          isDir: false,
          file: 'cancel.svelte',
          filepath: '/payment/cancel.svelte',
          name: 'cancel',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/payment/cancel.svelte',
          importPath: '../src/pages/payment/cancel.svelte',
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/payment/cancel',
          id: '_payment_cancel',
          component: () =>
            import('../src/pages/payment/cancel.svelte').then((m) => m.default),
        },
        {
          isFile: true,
          isDir: false,
          file: 'success.svelte',
          filepath: '/payment/success.svelte',
          name: 'success',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/payment/success.svelte',
          importPath: '../src/pages/payment/success.svelte',
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/payment/success',
          id: '_payment_success',
          component: () =>
            import('../src/pages/payment/success.svelte').then(
              (m) => m.default
            ),
        },
      ],
      isLayout: true,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      importPath: '../src/pages/payment/_layout.svelte',
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/payment',
      id: '_payment__layout',
      component: () =>
        import('../src/pages/payment/_layout.svelte').then((m) => m.default),
    },
    {
      isFile: true,
      isDir: true,
      file: '_layout.svelte',
      filepath: '/services/_layout.svelte',
      name: '_layout',
      ext: 'svelte',
      badExt: false,
      absolutePath:
        '/home/jaskaran/repos/enki-website/src/pages/services/_layout.svelte',
      children: [
        {
          isFile: true,
          isDir: false,
          file: 'index.svelte',
          filepath: '/services/index.svelte',
          name: 'index',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/services/index.svelte',
          importPath: '../src/pages/services/index.svelte',
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/services/index',
          id: '_services_index',
          component: () =>
            import('../src/pages/services/index.svelte').then((m) => m.default),
        },
      ],
      isLayout: true,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      importPath: '../src/pages/services/_layout.svelte',
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/services',
      id: '_services__layout',
      component: () =>
        import('../src/pages/services/_layout.svelte').then((m) => m.default),
    },
    {
      isFile: true,
      isDir: true,
      file: '_layout.svelte',
      filepath: '/what-we-offer/_layout.svelte',
      name: '_layout',
      ext: 'svelte',
      badExt: false,
      absolutePath:
        '/home/jaskaran/repos/enki-website/src/pages/what-we-offer/_layout.svelte',
      children: [
        {
          isFile: true,
          isDir: false,
          file: 'index.svelte',
          filepath: '/what-we-offer/index.svelte',
          name: 'index',
          ext: 'svelte',
          badExt: false,
          absolutePath:
            '/home/jaskaran/repos/enki-website/src/pages/what-we-offer/index.svelte',
          importPath: '../src/pages/what-we-offer/index.svelte',
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: '/what-we-offer/index',
          id: '_whatWeOffer_index',
          component: () =>
            import('../src/pages/what-we-offer/index.svelte').then(
              (m) => m.default
            ),
        },
      ],
      isLayout: true,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      importPath: '../src/pages/what-we-offer/_layout.svelte',
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: '/what-we-offer',
      id: '_whatWeOffer__layout',
      component: () =>
        import('../src/pages/what-we-offer/_layout.svelte').then(
          (m) => m.default
        ),
    },
  ],
  isLayout: true,
  isReset: false,
  isIndex: false,
  isFallback: false,
  isPage: false,
  isFile: true,
  file: '_layout.svelte',
  ext: 'svelte',
  badExt: false,
  importPath: '../src/pages/_layout.svelte',
  meta: {
    recursive: true,
    preload: false,
    prerender: true,
  },
  path: '/',
  id: '__layout',
  component: () => import('../src/pages/_layout.svelte').then((m) => m.default),
};

export const { tree, routes } = buildClientTree(_tree);
