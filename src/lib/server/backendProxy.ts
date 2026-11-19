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

  const response = await fetch(target, {
    method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
  });

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
