import { dev } from "$app/env";
import { PUBLIC_INTERNAL_K8S_URL, PUBLIC_SERVER_URL } from "$app/env/public";
import type { RequestHandler } from "./$types";

// The browser must never call the API cross-origin: CORS headers are not
// guaranteed (notably on backend error responses), which surfaced as
// intermittent "blocked by CORS policy" fetch failures. Proxy through the app
// so every client request is same-origin.
const backendBaseUrl = dev ? PUBLIC_SERVER_URL : PUBLIC_INTERNAL_K8S_URL;

const proxy: RequestHandler = async ({ params, url, request, fetch }) => {
  const target = `${backendBaseUrl}/${params.path}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("content-length");

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

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
