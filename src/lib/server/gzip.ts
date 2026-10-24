import { gzipSync } from "node:zlib";

export const GZIP_ENCODING = "gzip";

/** Whether a request's Accept-Encoding header allows a gzip response. */
export const acceptsGzip = (acceptEncoding: string | null): boolean =>
  Boolean(acceptEncoding?.toLowerCase().includes(GZIP_ENCODING));

/**
 * Compress a string with gzip. Returned as `Uint8Array<ArrayBuffer>` (a copy of
 * Node's Buffer) so it satisfies `BodyInit`/`BlobPart` in TypeScript.
 */
export const gzipString = (input: string): Uint8Array<ArrayBuffer> =>
  new Uint8Array(gzipSync(input));
