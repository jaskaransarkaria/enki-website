import { proxyToBackend } from "#lib/server/backendProxy.js";
import type { RequestHandler } from "./$types";

const proxy: RequestHandler = ({ params, url, request }) =>
  proxyToBackend({ url, request }, params.path);

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
