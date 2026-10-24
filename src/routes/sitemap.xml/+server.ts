import { PUBLIC_INTERNAL_K8S_URL } from "$env/static/public";
import { getSitemap } from "$lib/server/sitemapCache";

export const prerender = false;

export async function GET() {
  try {
    return new Response(await getSitemap(PUBLIC_INTERNAL_K8S_URL), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Failed to generate sitemap", error);
    return new Response("Sitemap temporarily unavailable", { status: 503 });
  }
}
