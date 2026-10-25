import { browser, dev } from "$app/env";
import { error } from "@sveltejs/kit";
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

  const productToShow = await refreshProductsFromServer(
    `${serverUrl}/product?id=${params.product}`,
    fetch,
  );

  if (!productToShow.length) {
    error(404, "Product not found");
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
