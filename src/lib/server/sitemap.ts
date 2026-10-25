import { PUBLIC_BUCKET_URL } from "$app/env/public";
import { SITE_URL } from "#lib/constants.js";
import type { SquareCategory } from "#lib/types/category.js";
import type { SquareProduct } from "#lib/types/product.js";

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
  images?: string[];
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

/** Absolute URLs for the images shown on a product page. */
const productImages = (product: SquareProduct): string[] => {
  const hashes = (product.item_data.variations ?? []).flatMap((variation) =>
    (variation.custom_attribute_values?.image_arr?.string_value ?? "")
      .split(",")
      .filter(Boolean),
  );

  return [...new Set(hashes)].map((hash) => `${PUBLIC_BUCKET_URL}/${hash}`);
};

/**
 * Build the flat list of sitemap entries from the raw catalog data.
 *
 * Categories are only included when at least one indexable product exists
 * somewhere in their subtree, and their lastmod is the newest product date
 * found anywhere beneath them.
 */
export const collectEntries = (
  products: readonly SquareProduct[],
  categories: readonly SquareCategory[],
): SitemapEntry[] => {
  const indexableProducts = products.filter(isIndexableProduct);

  // Newest updated_at for products assigned directly to each category.
  const directLastmod = new Map<string, string>();
  for (const product of indexableProducts) {
    const lastmod = toLastmod(product.updated_at);
    if (!lastmod) continue;

    for (const { id } of product.item_data.categories ?? []) {
      const existing = directLastmod.get(id);
      if (!existing || lastmod > existing) directLastmod.set(id, lastmod);
    }
  }

  // Propagate the newest descendant date up the tree.
  const categoryLastmod = new Map<string, string>();

  const visit = (nodes: readonly SquareCategory[]): string | undefined => {
    let subtreeLastmod: string | undefined;

    for (const category of nodes) {
      const childrenLastmod = visit(category.children ?? []);
      const ownLastmod = directLastmod.get(category.id);

      const lastmod =
        ownLastmod && childrenLastmod
          ? ownLastmod > childrenLastmod
            ? ownLastmod
            : childrenLastmod
          : (ownLastmod ?? childrenLastmod);

      if (lastmod) {
        categoryLastmod.set(category.id, lastmod);
        if (!subtreeLastmod || lastmod > subtreeLastmod) {
          subtreeLastmod = lastmod;
        }
      }
    }

    return subtreeLastmod;
  };

  visit(categories);

  const entries: SitemapEntry[] = [
    ...STATIC_ROUTES.map((loc) => ({ loc })),
    ...[...categoryLastmod.entries()].map(([id, lastmod]) => ({
      loc: `/shop/category/${id}`,
      lastmod,
    })),
    ...indexableProducts.map((product) => ({
      loc: `/shop/product/${product.id}`,
      lastmod: toLastmod(product.updated_at),
      images: productImages(product),
    })),
  ];

  // Stable, deterministic output keeps diffs and caching predictable.
  return entries.sort((a, b) => a.loc.localeCompare(b.loc));
};

export const buildSitemapXml = (
  products: readonly SquareProduct[],
  categories: readonly SquareCategory[],
): string => {
  const urls = collectEntries(products, categories).map(
    ({ loc, lastmod, images }) => {
      const lines = [`    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);

      for (const image of images ?? []) {
        lines.push(
          `    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n    </image:image>`,
        );
      }

      return `  <url>\n${lines.join("\n")}\n  </url>`;
    },
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
};

export const FETCH_TIMEOUT_MS = 30_000;

const fetchCatalog = (url: string) =>
  fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });

/**
 * Fetch the catalog from the backend and turn it into a sitemap.
 * `priority` and `changefreq` are intentionally omitted: Google ignores both,
 * and the generated priority values were invalid anyway.
 */
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
