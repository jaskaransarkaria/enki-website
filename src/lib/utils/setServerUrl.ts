import { PUBLIC_SERVER_URL, PUBLIC_INTERNAL_K8S_URL } from "$app/env/public";

/**
 * Same-origin base for browser API calls. Requests are proxied to the backend
 * by `src/routes/api/[...path]/+server.ts`, so the browser never makes a
 * cross-origin request (which is subject to CORS and inconsistent error
 * headers).
 */
export const CLIENT_API_BASE = "/api";

export const setServerUrl = (isBrowser: boolean, isDev: boolean): string =>
  isBrowser
    ? CLIENT_API_BASE
    : isDev
      ? PUBLIC_SERVER_URL
      : PUBLIC_INTERNAL_K8S_URL;
