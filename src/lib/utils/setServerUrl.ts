import { PUBLIC_SERVER_URL, PUBLIC_INTERNAL_K8S_URL } from "$env/static/public";

export const setServerUrl = (isBrowser: boolean, isDev: boolean): string =>
  isBrowser || isDev ? PUBLIC_SERVER_URL : PUBLIC_INTERNAL_K8S_URL;
