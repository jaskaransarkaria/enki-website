import { browser, dev } from "$app/env";
import { error, redirect } from "@sveltejs/kit";
import { SITE_URL } from "#lib/constants.js";
import { setServerUrl } from "#lib/utils/setServerUrl.js";
import {
  refreshCategoriesFromServer,
  refreshProductsFromServer,
} from "#lib/utils/requests.js";
import { stripSupplierSuffix } from "#lib/utils/seo.js";
import {
  categoryTrail,
  shopBreadcrumb,
  type Breadcrumb,
} from "#lib/utils/structuredData.js";

export async function load({ fetch, params }) {
  const serverUrl = setServerUrl(browser, dev);

  // Catalogue IDs are uppercase. Normalise the URL param so a lowercase or
  // mixed-case variant (e.g. one Google lowercased) resolves instead of
  // 404ing, then 301 to the canonical URL so the cases don't compete.
  const productId = params.product.toUpperCase();

  const productToShow = await refreshProductsFromServer(
    `${serverUrl}/product?id=${productId}`,
    fetch,
  );

  if (!productToShow.length) {
    error(404, "Product not found");
  }

  if (params.product !== productToShow[0].id) {
    redirect(301, `/shop/product/${productToShow[0].id}`);
  }

  // Build the breadcrumb trail server-side (the client already has the store).
  let breadcrumbTrail: Breadcrumb[] = [];
  if (!browser) {
    const categories = await refreshCategoriesFromServer(
      `${serverUrl}/categories`,
      fetch,
    );

    const product = productToShow[0];
    const categoryId = product?.item_data?.categories?.[0]?.id;

    breadcrumbTrail = [
      shopBreadcrumb,
      ...(categoryId ? categoryTrail(categories, categoryId) : []),
      ...(product
        ? [
            {
              name: stripSupplierSuffix(product.item_data.name),
              url: `${SITE_URL}/shop/product/${product.id}`,
            },
          ]
        : []),
    ];
  }

  return { productToShow, breadcrumbTrail };
}
