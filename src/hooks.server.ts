import { PUBLIC_INTERNAL_K8S_URL } from "$env/static/public";
import { warmSitemapCache } from "$lib/server/sitemapCache";

// Runs before the server starts responding. Building the sitemap here means
// the first request is served from cache; the port only opens once warm-up has
// finished, which is what the Kubernetes startup probe waits for.
export const init = async () => {
  await warmSitemapCache(PUBLIC_INTERNAL_K8S_URL);
};
