/**
 * @roxi/routify 2.7.3
 * File generated Fri Mar 26 2021 10:54:36 GMT+0000 (Greenwich Mean Time)
 */

export const __version = '2.7.3';
export const __timestamp = '2021-03-26T10:54:36.141Z';

//buildRoutes
import { buildClientTree } from '@roxi/routify/runtime/buildRoutes';

//imports

//options
export const options = {};

//tree
export const _tree = {
  root: true,
  children: [
    {
      isDir: true,
      children: [
        {
          isIndex: true,
          isPage: true,
          path: '/classes/index',
          id: '_classes_index',
          component: () =>
            import('../src/pages/classes/index.svelte').then((m) => m.default),
        },
      ],
      isLayout: true,
      path: '/classes',
      id: '_classes__layout',
      component: () =>
        import('../src/pages/classes/_layout.svelte').then((m) => m.default),
    },
    {
      isDir: true,
      children: [
        {
          isIndex: true,
          isPage: true,
          path: '/contact/index',
          id: '_contact_index',
          component: () =>
            import('../src/pages/contact/index.svelte').then((m) => m.default),
        },
      ],
      isLayout: true,
      path: '/contact',
      id: '_contact__layout',
      component: () =>
        import('../src/pages/contact/_layout.svelte').then((m) => m.default),
    },
    {
      isIndex: true,
      isPage: true,
      path: '/index',
      id: '_index',
      component: () =>
        import('../src/pages/index.svelte').then((m) => m.default),
    },
    {
      isDir: true,
      children: [
        {
          isPage: true,
          path: '/online-shop/:category',
          id: '_onlineShop__category',
          component: () =>
            import('../src/pages/online-shop/[category].svelte').then(
              (m) => m.default
            ),
        },
        {
          isDir: true,
          ext: '',
          children: [
            {
              isPage: true,
              path: '/online-shop/:subCategory/:subCategory',
              id: '_onlineShop__subCategory__subCategory',
              component: () =>
                import(
                  '../src/pages/online-shop/[subCategory]/[subCategory].svelte'
                ).then((m) => m.default),
            },
          ],
          path: '/online-shop/:subCategory',
        },
        {
          isIndex: true,
          isPage: true,
          path: '/online-shop/index',
          id: '_onlineShop_index',
          component: () =>
            import('../src/pages/online-shop/index.svelte').then(
              (m) => m.default
            ),
        },
      ],
      isLayout: true,
      path: '/online-shop',
      id: '_onlineShop__layout',
      component: () =>
        import('../src/pages/online-shop/_layout.svelte').then(
          (m) => m.default
        ),
    },
    {
      isDir: true,
      children: [
        {
          isPage: true,
          path: '/payment/basket',
          id: '_payment_basket',
          component: () =>
            import('../src/pages/payment/basket.svelte').then((m) => m.default),
        },
        {
          isPage: true,
          path: '/payment/cancel',
          id: '_payment_cancel',
          component: () =>
            import('../src/pages/payment/cancel.svelte').then((m) => m.default),
        },
        {
          isPage: true,
          path: '/payment/checkout',
          id: '_payment_checkout',
          component: () =>
            import('../src/pages/payment/checkout.svelte').then(
              (m) => m.default
            ),
        },
        {
          isPage: true,
          path: '/payment/success',
          id: '_payment_success',
          component: () =>
            import('../src/pages/payment/success.svelte').then(
              (m) => m.default
            ),
        },
      ],
      isLayout: true,
      path: '/payment',
      id: '_payment__layout',
      component: () =>
        import('../src/pages/payment/_layout.svelte').then((m) => m.default),
    },
    {
      isDir: true,
      children: [
        {
          isIndex: true,
          isPage: true,
          path: '/services/index',
          id: '_services_index',
          component: () =>
            import('../src/pages/services/index.svelte').then((m) => m.default),
        },
      ],
      isLayout: true,
      path: '/services',
      id: '_services__layout',
      component: () =>
        import('../src/pages/services/_layout.svelte').then((m) => m.default),
    },
    {
      isDir: true,
      children: [
        {
          isIndex: true,
          isPage: true,
          path: '/what-we-offer/index',
          id: '_whatWeOffer_index',
          component: () =>
            import('../src/pages/what-we-offer/index.svelte').then(
              (m) => m.default
            ),
        },
      ],
      isLayout: true,
      path: '/what-we-offer',
      id: '_whatWeOffer__layout',
      component: () =>
        import('../src/pages/what-we-offer/_layout.svelte').then(
          (m) => m.default
        ),
    },
  ],
  isLayout: true,
  path: '/',
  id: '__layout',
  component: () => import('../src/pages/_layout.svelte').then((m) => m.default),
};

export const { tree, routes } = buildClientTree(_tree);
