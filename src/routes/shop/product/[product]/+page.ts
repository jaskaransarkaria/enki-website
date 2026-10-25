import { browser, dev } from "$app/environment";
import { SITE_URL } from "$lib/constants";
import { setServerUrl } from "$lib/utils/setServerUrl";
import {
  refreshCategoriesFromServer,
  refreshProductsFromServer,
} from "$lib/utils/requests";
import { stripSupplierSuffix } from "$lib/utils/seo";
import {
  categoryTrail,
  shopBreadcrumb,
  type Breadcrumb,
} from "$lib/utils/structuredData";

export async function load({ fetch, params }) {
  const serverUrl = setServerUrl(browser, dev);

  const productToShow = await refreshProductsFromServer(
    `${serverUrl}/product?id=${params.product}`,
    fetch,
  );

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
