/**
 * Fallback header for responses that don't set their own (chiefly SSR pages,
 * which SvelteKit leaves without a Cache-Control). `no-cache` means the browser
 * may reuse a cached copy only after revalidating it, which the ETag makes
 * cheap — far better than letting proxies heuristically cache for months.
 */
export const DEFAULT_CACHE_CONTROL = "no-cache";

export const withDefaultCacheHeaders = (response: Response): Response => {
  if (!response.headers.has("cache-control")) {
    response.headers.set("cache-control", DEFAULT_CACHE_CONTROL);
  }

  return response;
};
