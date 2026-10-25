import { browser, dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import { setServerUrl } from "$lib/utils/setServerUrl";
import {
  refreshCategoriesFromServer,
  refreshCategoryFromServer,
  refreshProductsFromServer,
} from "$lib/utils/requests";
import {
  categoryTrail,
  shopBreadcrumb,
  type Breadcrumb,
} from "$lib/utils/structuredData";

import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

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

  const categoryResults = await refreshCategoryFromServer(
    `${serverUrl}/category?id=${params.category}`,
    fetch,
  );

  const category = traverseCategoryObj(params.category, categoryResults?.[0]);

  if (!category) {
    error(404, "Category not found");
  }

  let productResults: SquareProduct[] = [];

  if (!category.children?.length) {
    productResults = [
      ...(await refreshProductsFromServer(
        `${serverUrl}/products-by-category?id=${params.category}`,
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
      ...categoryTrail(categories, params.category),
    ];
  }

  return {
    categoryToShow: category,
    productArr: productResults,
    breadcrumbTrail,
  };
}
