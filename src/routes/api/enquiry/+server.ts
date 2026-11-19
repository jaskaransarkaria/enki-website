import { proxyToBackend } from "#lib/server/backendProxy.js";
import type { RequestHandler } from "./$types";

// The generic `/api/[...path]` proxy strips the `/api` prefix before forwarding
// (so `/api/product` reaches the backend's `/product`). The backend registers
// the enquiry handler as `/api/enquiry`, so keep the full path here. This lets
// the enquiry form post to the same-origin `/api/enquiry` instead of calling
// `server.enkionline.com` cross-origin (which its oauth2-proxy rejects).
const proxy: RequestHandler = ({ url, request }) =>
  proxyToBackend({ url, request }, "api/enquiry");

export const POST = proxy;
