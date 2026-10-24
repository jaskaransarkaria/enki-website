import { buildSitemap } from "./sitemap";

export const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

let cache: { xml: string; generatedAt: number } | null = null;
let inFlight: Promise<string> | null = null;

/**
 * Return the cached sitemap, rebuilding it when the TTL has expired.
 *
 * Concurrent callers (including the startup warm-up) share a single rebuild,
 * and a failed rebuild falls back to the last good sitemap.
 */
export const getSitemap = async (apiBaseUrl: string): Promise<string> => {
  if (cache && Date.now() - cache.generatedAt <= CACHE_TTL_MS) {
    return cache.xml;
  }

  inFlight ??= buildSitemap(apiBaseUrl)
    .then((xml) => {
      cache = { xml, generatedAt: Date.now() };
      return xml;
    })
    .finally(() => {
      inFlight = null;
    });

  try {
    return await inFlight;
  } catch (error) {
    if (cache) return cache.xml; // stale fallback
    throw error;
  }
};

/**
 * Build the sitemap once at startup so the first request is served from cache.
 * Never throws: a failed warm-up must not stop the server from booting.
 */
export const warmSitemapCache = async (apiBaseUrl: string): Promise<void> => {
  try {
    await getSitemap(apiBaseUrl);
  } catch (error) {
    console.error("Failed to warm sitemap cache", error);
  }
};
