import type { Handle } from "@sveltejs/kit/hooks";
import { PUBLIC_INTERNAL_K8S_URL } from "$app/env/public";
import { withDefaultCacheHeaders } from "#lib/server/cacheHeaders.js";
import { apexRedirectUrl } from "#lib/server/redirects.js";
import { warmSitemapCache } from "#lib/server/sitemapCache.js";

// Runs before the server starts responding. Building the sitemap here means
// the first request is served from cache; the port only opens once warm-up has
// finished, which is what the Kubernetes startup probe waits for.
export const init = async () => {
  await warmSitemapCache(PUBLIC_INTERNAL_K8S_URL);
};

export const handle: Handle = async ({ event, resolve }) => {
  // Consolidate the www host onto the apex host with a permanent redirect.
  const redirectTo = apexRedirectUrl(event.url);
  if (redirectTo) {
    return new Response(null, {
      status: 301,
      headers: { location: redirectTo.toString() },
    });
  }

  // SvelteKit leaves SSR responses without a Cache-Control, which lets proxies
  // cache pages heuristically for a long time. Give them a safe default; routes
  // that set their own header (e.g. /sitemap.xml) are left untouched.
  return withDefaultCacheHeaders(await resolve(event));
};
