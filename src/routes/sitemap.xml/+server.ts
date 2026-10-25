import { PUBLIC_INTERNAL_K8S_URL } from "$app/env/public";
import { acceptsGzip, gzipString } from "#lib/server/gzip.js";
import { getSitemap } from "#lib/server/sitemapCache.js";

export const prerender = false;

export async function GET({ request }) {
  try {
    const xml = await getSitemap(PUBLIC_INTERNAL_K8S_URL);

    const headers: Record<string, string> = {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept-Encoding",
    };

    if (acceptsGzip(request.headers.get("accept-encoding"))) {
      headers["Content-Encoding"] = "gzip";
      return new Response(gzipString(xml), { headers });
    }

    return new Response(xml, { headers });
  } catch (error) {
    console.error("Failed to generate sitemap", error);
    return new Response("Sitemap temporarily unavailable", { status: 503 });
  }
}
