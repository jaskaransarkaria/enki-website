import { SITE_URL } from "$lib/constants";
import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

/**
 * Pages that are always indexable and don't depend on catalog data.
 * Deliberately excludes transactional/duplicate routes such as
 * /shop/basket, /shop/search and /payment.
 */
export const STATIC_ROUTES = [
  "/",
  "/shop",
  "/repairs",
  "/workshops",
  "/workshops/craft",
  "/workshops/scheduled",
  "/workshops/wedding-rings",
  "/about",
  "/contact",
  "/useful-links",
  "/terms-and-conditions",
  "/privacy-policy",
] as const;

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Normalise an ISO timestamp to the YYYY-MM-DD value sitemaps expect. */
export const toLastmod = (iso?: string): string | undefined => {
  if (!iso) return undefined;

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString().slice(0, 10);
};

export const isIndexableProduct = (product: SquareProduct): boolean =>
  Boolean(
    product?.item_data &&
    !product.item_data.is_archived &&
    product.item_data.ecom_visibility === "VISIBLE",
  );

/**
 * Build the flat list of sitemap entries from the raw catalog data.
 *
 * Categories are only included when at least one indexable product exists
 * somewhere in their subtree, which drops empty/parent-only categories that
 * would otherwise render as thin, untitled pages.
 */
export const collectEntries = (
  products: readonly SquareProduct[],
  categories: readonly SquareCategory[],
): SitemapEntry[] => {
  const indexableProducts = products.filter(isIndexableProduct);

  const categoriesWithProducts = new Set<string>();

  const visit = (nodes: readonly SquareCategory[]): boolean => {
    let subtreeHasProducts = false;

    for (const category of nodes) {
      const childrenHaveProducts = visit(category.children ?? []);
      const hasOwnProducts = indexableProducts.some((product) =>
        product.item_data.categories?.some(({ id }) => id === category.id),
      );

      if (childrenHaveProducts || hasOwnProducts) {
        categoriesWithProducts.add(category.id);
        subtreeHasProducts = true;
      }
    }

    return subtreeHasProducts;
  };

  visit(categories);

  const entries: SitemapEntry[] = [
    ...STATIC_ROUTES.map((loc) => ({ loc })),
    ...[...categoriesWithProducts].map((id) => ({
      loc: `/shop/category/${id}`,
    })),
    ...indexableProducts.map((product) => ({
      loc: `/shop/product/${product.id}`,
      lastmod: toLastmod(product.updated_at),
    })),
  ];

  // Stable, deterministic output keeps diffs and caching predictable.
  return entries.sort((a, b) => a.loc.localeCompare(b.loc));
};

export const buildSitemapXml = (
  products: readonly SquareProduct[],
  categories: readonly SquareCategory[],
): string => {
  const urls = collectEntries(products, categories).map(({ loc, lastmod }) => {
    const lines = [`    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>`];
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);

    return `  <url>\n${lines.join("\n")}\n  </url>`;
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
};

/**
 * Fetch the catalog from the backend and turn it into a sitemap.
 * `priority` and `changefreq` are intentionally omitted: Google ignores both,
 * and the generated priority values were invalid anyway.
 */
export const FETCH_TIMEOUT_MS = 30_000;

const fetchCatalog = (url: string) =>
  fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });

export const buildSitemap = async (apiBaseUrl: string): Promise<string> => {
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetchCatalog(`${apiBaseUrl}/get-all-products`),
    fetchCatalog(`${apiBaseUrl}/categories`),
  ]);

  if (!productsResponse.ok || !categoriesResponse.ok) {
    throw new Error(
      `Failed to build sitemap (products: ${productsResponse.status}, categories: ${categoriesResponse.status})`,
    );
  }

  const [products, categories] = await Promise.all([
    productsResponse.json() as Promise<SquareProduct[]>,
    categoriesResponse.json() as Promise<SquareCategory[]>,
  ]);

  return buildSitemapXml(products, categories);
};
