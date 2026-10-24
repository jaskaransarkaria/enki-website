const WWW_PREFIX = "www.";

/**
 * If the request arrived on a `www.` host, return the equivalent URL on the
 * apex host, preserving the path, query string and port. Returns null for any
 * other host so callers can fall through to normal handling.
 */
export const apexRedirectUrl = (url: URL): URL | null => {
  if (!url.hostname.startsWith(WWW_PREFIX)) return null;

  const target = new URL(url);
  target.hostname = url.hostname.slice(WWW_PREFIX.length);

  return target;
};
