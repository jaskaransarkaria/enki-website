import { PUBLIC_INTERNAL_K8S_URL } from "$env/static/public";
import { withDefaultCacheHeaders } from "$lib/server/cacheHeaders";
import { warmSitemapCache } from "$lib/server/sitemapCache";
import type { Handle } from "@sveltejs/kit";

// Runs before the server starts responding. Building the sitemap here means
// the first request is served from cache; the port only opens once warm-up has
// finished, which is what the Kubernetes startup probe waits for.
export const init = async () => {
  await warmSitemapCache(PUBLIC_INTERNAL_K8S_URL);
};

// SvelteKit leaves SSR responses without a Cache-Control, which lets proxies
// cache pages heuristically for a long time. Give them a safe default; routes
// that set their own header (e.g. /sitemap.xml) are left untouched.
export const handle: Handle = async ({ event, resolve }) =>
  withDefaultCacheHeaders(await resolve(event));
