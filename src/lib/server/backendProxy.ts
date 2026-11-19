import { dev } from "$app/env";
import { PUBLIC_INTERNAL_K8S_URL, PUBLIC_SERVER_URL } from "$app/env/public";
import type { RequestEvent } from "@sveltejs/kit";

// The browser must never call the API cross-origin: CORS headers are not
// guaranteed (notably on backend error responses), which surfaced as
// intermittent "blocked by CORS policy" fetch failures. Proxy through the app
// so every client request is same-origin.
const backendBaseUrl = dev ? PUBLIC_SERVER_URL : PUBLIC_INTERNAL_K8S_URL;

// These describe the *browser's* request to the website, which nginx adds
// before the request reaches us. Forwarding them to the backend makes the
// oauth2-proxy sidecar there trust the wrong host and reject the login redirect
// ("Invalid redirect generated from X-Forwarded-* headers"). Drop them so the
// backend (or its own ingress) sets them from the connection it actually sees.
const forwardedHeaders = [
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-uri",
];

// Give up on the backend before Cloudflare does (100s, which surfaces as a bare
// 524 page), so callers get a response they can handle. Kept above the
// backend's own limits (e.g. ~40s for sending enquiry email) so its more
// specific error wins when it has one.
export const BACKEND_TIMEOUT_MS = 60_000;

/**
 * Forwards a same-origin `/api` request to the backend. `path` is the backend
 * path to hit, without a leading slash.
 */
export const proxyToBackend = async (
  { request, url }: Pick<RequestEvent, "request" | "url">,
  path: string,
): Promise<Response> => {
  const target = `${backendBaseUrl}/${path}${url.search}`;

  const headers = new Headers(request.headers);
  for (const header of [
    "host",
    "origin",
    "referer",
    "content-length",
    ...forwardedHeaders,
  ]) {
    headers.delete(header);
  }

  const method = request.method;
  const hasBody = method !== "GET" && method !== "HEAD";

  let response: Response;
  try {
    response = await fetch(target, {
      method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "TimeoutError") {
      return new Response("The server took too long to respond.", {
        status: 504,
      });
    }
    throw e;
  }

  const responseHeaders = new Headers(response.headers);
  // `fetch` has already decoded the body, so the original encoding/length
  // headers would be wrong if forwarded.
  for (const header of [
    "content-encoding",
    "content-length",
    "transfer-encoding",
    "connection",
  ]) {
    responseHeaders.delete(header);
  }

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
};
