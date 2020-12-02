
/**
 * @roxi/routify 2.7.3
 * File generated Wed Dec 02 2020 21:23:48 GMT+0000 (Greenwich Mean Time)
 */

export const __version = "2.7.3"
export const __timestamp = "2020-12-02T21:23:48.017Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "_layout",
  "filepath": "/_layout.svelte",
  "root": true,
  "ownMeta": {},
  "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "about.svelte",
      "filepath": "/about.svelte",
      "name": "about",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/about.svelte",
      "importPath": "../src/pages/about.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/about",
      "id": "_about",
      "component": () => import('../src/pages/about.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "cancel.svelte",
      "filepath": "/cancel.svelte",
      "name": "cancel",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/cancel.svelte",
      "importPath": "../src/pages/cancel.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/cancel",
      "id": "_cancel",
      "component": () => import('../src/pages/cancel.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "checkout.svelte",
      "filepath": "/checkout.svelte",
      "name": "checkout",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/checkout.svelte",
      "importPath": "../src/pages/checkout.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/checkout",
      "id": "_checkout",
      "component": () => import('../src/pages/checkout.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "services.svelte",
      "filepath": "/services.svelte",
      "name": "services",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/services.svelte",
      "importPath": "../src/pages/services.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/services",
      "id": "_services",
      "component": () => import('../src/pages/services.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "success.svelte",
      "filepath": "/success.svelte",
      "name": "success",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/jaskaran/fun/enki-website/src/pages/success.svelte",
      "importPath": "../src/pages/success.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/success",
      "id": "_success",
      "component": () => import('../src/pages/success.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "isPage": false,
  "isFile": true,
  "file": "_layout.svelte",
  "ext": "svelte",
  "badExt": false,
  "importPath": "../src/pages/_layout.svelte",
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

