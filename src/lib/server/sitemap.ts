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

export const entriesToXml = (entries: readonly SitemapEntry[]): string => {
  const urls = entries.map(({ loc, lastmod, images }) => {
    const lines = [`    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>`];
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);

    for (const image of images ?? []) {
      lines.push(
        `    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n    </image:image>`,
      );
    }

    return `  <url>\n${lines.join("\n")}\n  </url>`;
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
};

export const buildSitemapXml = (
  products: readonly SquareProduct[],
  categories: readonly SquareCategory[],
): string => entriesToXml(collectEntries(products, categories));

export const FETCH_TIMEOUT_MS = 30_000;

/**
 * Total time budget for validating catalogue entries. The sitemap is warmed up
 * before the server accepts traffic, so this stays well inside the Kubernetes
 * startup probe (30 × 2s). Entries not reached within the budget are kept
 * unvalidated rather than delaying startup further.
 */
export const VALIDATION_BUDGET_MS = 30_000;

/** How many entry validations run in parallel. */
export const VALIDATION_CONCURRENCY = 16;

/**
 * Guard against caching a gutted sitemap when the backend itself is unhealthy:
 * if more than this share of catalogue entries fail validation, abort the
 * rebuild so the previous sitemap is served instead.
 */
export const MAX_VALIDATION_FAILURE_RATIO = 0.25;

const fetchCatalog = (url: string, fetchImpl: typeof fetch) =>
  fetchImpl(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });

/**
 * The backend endpoint the matching page's `load` calls to resolve an entry.
 * Static routes aren't backed by the catalogue and aren't validated.
 */
export const entryValidationUrl = (
  apiBaseUrl: string,
  loc: string,
): string | undefined => {
  const product = loc.match(/^\/shop\/product\/(.+)$/);
  if (product) return `${apiBaseUrl}/product?id=${product[1]}`;

  const category = loc.match(/^\/shop\/category\/(.+)$/);
  if (category) return `${apiBaseUrl}/category?id=${category[1]}`;

  return undefined;
};

/**
 * Drop entries whose page would 404. `/get-all-products` and the single-item
 * endpoints can disagree (e.g. a product present in the catalogue list but
 * missing from `/product`), so each catalogue-backed entry is checked against
 * the same endpoint its page uses.
 *
 * Network/timeout errors are treated as "unknown" and the entry is kept, so a
 * transient blip can't strip the sitemap. If too many entries fail outright the
 * backend is presumed unhealthy and we throw, letting the caller serve the
 * previous sitemap rather than caching a gutted one.
 */
export const filterResolvableEntries = async (
  apiBaseUrl: string,
  entries: readonly SitemapEntry[],
  fetchImpl: typeof fetch = fetch,
): Promise<SitemapEntry[]> => {
  const urls = entries.map((entry) =>
    entryValidationUrl(apiBaseUrl, entry.loc),
  );
  const checks = urls.filter((url) => url !== undefined).length;
  if (checks === 0) return [...entries];

  const keep = new Array<boolean>(entries.length).fill(true);
  let cursor = 0;
  let failures = 0;

  const controller = new AbortController();
  const deadline = Date.now() + VALIDATION_BUDGET_MS;
  const budget = setTimeout(() => controller.abort(), VALIDATION_BUDGET_MS);

  const worker = async () => {
    while (cursor < entries.length && Date.now() < deadline) {
      const index = cursor++;
      const url = urls[index];
      if (!url) continue;

      try {
        const response = await fetchImpl(url, { signal: controller.signal });
        if (!response.ok) {
          keep[index] = false;
          failures += 1;
        }
      } catch {
        // Unknown (network/timeout/budget): keep the entry.
      }
    }
  };

  try {
    await Promise.all(
      Array.from(
        { length: Math.min(VALIDATION_CONCURRENCY, entries.length) },
        worker,
      ),
    );
  } finally {
    clearTimeout(budget);
  }

  if (failures / checks > MAX_VALIDATION_FAILURE_RATIO) {
    throw new Error(
      `Sitemap validation failed for ${failures}/${checks} catalogue entries`,
    );
  }

  return entries.filter((_, index) => keep[index]);
};

/**
 * Fetch the catalog from the backend and turn it into a sitemap.
 * `priority` and `changefreq` are intentionally omitted: Google ignores both,
 * and the generated priority values were invalid anyway.
 */
export const buildSitemap = async (
  apiBaseUrl: string,
  fetchImpl: typeof fetch = fetch,
): Promise<string> => {
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetchCatalog(`${apiBaseUrl}/get-all-products`, fetchImpl),
    fetchCatalog(`${apiBaseUrl}/categories`, fetchImpl),
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

  const entries = await filterResolvableEntries(
    apiBaseUrl,
    collectEntries(products, categories),
    fetchImpl,
  );

  return entriesToXml(entries);
};
