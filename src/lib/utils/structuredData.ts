import { PUBLIC_BUCKET_URL } from "$app/env/public";
import { SITE_URL } from "#lib/constants.js";
import type { SquareCategory } from "#lib/types/category.js";
import type { SquareProduct } from "#lib/types/product.js";
import { plainText, stripSupplierSuffix } from "./seo";

export const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Serialise JSON-LD for injection into `<svelte:head>` via `{@html …}`.
 * `<` is escaped so a `</script>` inside the data can't break out of the tag.
 */
export const jsonLdScript = (data: unknown): string =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  )}</script>`;

const supplierOf = (name: string): string | undefined =>
  name.match(/\s+[-–]\s+([^-–]+)$/)?.[1]?.trim();

export const productImageUrls = (product: SquareProduct): string[] => {
  const hashes = (product.item_data.variations ?? []).flatMap((variation) =>
    (variation.custom_attribute_values?.image_arr?.string_value ?? "")
      .split(",")
      .filter(Boolean),
  );

  return [...new Set(hashes)].map((hash) => `${PUBLIC_BUCKET_URL}/${hash}`);
};

export const productJsonLd = (product: SquareProduct) => {
  const variations = product.item_data.variations ?? [];
  const supplier = supplierOf(product.item_data.name);
  const url = `${SITE_URL}/shop/product/${product.id}`;

  const offers = variations.map((variation) => {
    const data = variation.item_variation_data;
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      price: (data.price_money.amount / 100).toFixed(2),
      priceCurrency: data.price_money.currency ?? "GBP",
      availability:
        parseInt(data.quantity ?? "0", 10) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url,
      seller: { "@id": BUSINESS_ID },
    };

    if (data.sku) offer.sku = data.sku;
    if (data.upc && /^\d{13}$/.test(data.upc)) offer.gtin13 = data.upc;

    return offer;
  });

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stripSupplierSuffix(product.item_data.name),
    description: plainText(product.item_data.description_html),
    image: productImageUrls(product),
    ...(supplier ? { brand: { "@type": "Brand", name: supplier } } : {}),
    ...(offers.length
      ? { offers: offers.length === 1 ? offers[0] : offers }
      : {}),
  };
};

export interface Breadcrumb {
  name: string;
  url: string;
}
export const shopBreadcrumb: Breadcrumb = {
  name: "Shop",
  url: `${SITE_URL}/shop`,
};

export const breadcrumbJsonLd = (items: Breadcrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/** Root-first trail to a category, walking up via `parent_category.id`. */
export const categoryTrail = (
  categories: readonly SquareCategory[],
  categoryId: string,
): Breadcrumb[] => {
  const byId = new Map<string, SquareCategory>();

  const index = (nodes: readonly SquareCategory[]) => {
    for (const node of nodes) {
      byId.set(node.id, node);
      index(node.children ?? []);
    }
  };
  index(categories);

  const trail: Breadcrumb[] = [];
  let current = byId.get(categoryId);

  while (current) {
    trail.unshift({
      name: current.category_data.name,
      url: `${SITE_URL}/shop/category/${current.id}`,
    });
    const parentId = current.category_data.parent_category?.id;
    current = parentId ? byId.get(parentId) : undefined;
  }

  return trail;
};
