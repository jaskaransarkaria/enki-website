import { browser, dev } from "$app/env";
import { error, redirect } from "@sveltejs/kit";
import { setServerUrl } from "#lib/utils/setServerUrl.js";
import {
  refreshCategoriesFromServer,
  refreshCategoryFromServer,
  refreshProductsFromServer,
} from "#lib/utils/requests.js";
import {
  categoryTrail,
  shopBreadcrumb,
  type Breadcrumb,
} from "#lib/utils/structuredData.js";

import type { SquareCategory } from "#lib/types/category.js";
import type { SquareProduct } from "#lib/types/product.js";

const traverseCategoryObj = (
  id: string,
  returnedCategoryObj: SquareCategory,
): SquareCategory | undefined => {
  if (returnedCategoryObj?.id === id) {
    return returnedCategoryObj;
  } else if (returnedCategoryObj?.children) {
    // search each category/children branch recursively
    for (const cat of returnedCategoryObj.children) {
      if (cat.id === id) {
        return cat;
      } else if (cat.children) {
        const result = traverseCategoryObj(id, cat);
        if (result) {
          return result;
        }
      }
    }
  }

  // category id doesn't match and is the end of the branch in the tree
  return undefined;
};

export async function load({ fetch, params }) {
  const serverUrl = setServerUrl(browser, dev);

  // Catalogue IDs are uppercase. Normalise the URL param so a lowercase or
  // mixed-case variant (e.g. one Google lowercased) resolves instead of
  // 404ing, then 301 to the canonical URL so the cases don't compete.
  const categoryId = params.category.toUpperCase();

  const categoryResults = await refreshCategoryFromServer(
    `${serverUrl}/category?id=${categoryId}`,
    fetch,
  );

  const category = traverseCategoryObj(categoryId, categoryResults?.[0]);

  if (!category) {
    error(404, "Category not found");
  }

  if (params.category !== category.id) {
    redirect(301, `/shop/category/${category.id}`);
  }

  let productResults: SquareProduct[] = [];

  if (!category.children?.length) {
    productResults = [
      ...(await refreshProductsFromServer(
        `${serverUrl}/products-by-category?id=${categoryId}`,
        fetch,
      )),
    ];
  }

  // Build the breadcrumb trail server-side (the client already has the store).
  let breadcrumbTrail: Breadcrumb[] = [];
  if (!browser) {
    const categories = await refreshCategoriesFromServer(
      `${serverUrl}/categories`,
      fetch,
    );
    breadcrumbTrail = [
      shopBreadcrumb,
      ...categoryTrail(categories, categoryId),
    ];
  }

  return {
    categoryToShow: category,
    productArr: productResults,
    breadcrumbTrail,
  };
}
