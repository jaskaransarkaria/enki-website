import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import {
  refreshCategoryFromServer,
  refreshProductsFromServer,
} from "$lib/utils/requests";

import type { SquareCategory } from "$lib/types/category";

const traverseCategoryObj = (
  id: string,
  returnedCategoryObj: SquareCategory
): SquareCategory => {
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
  } else {
    // category id doesn't match and is the end of the branch in the tree
    return undefined;
  }
};

export async function load({ fetch, params }) {
  const categoryResults = await refreshCategoryFromServer(
    `${PUBLIC_SERVER_URL}/category?id=${params.category}`,
    fetch
  );

  const productResults = await refreshProductsFromServer(
    `${setServerUrl(browser, dev)}/products-by-category?id=${params.category}`,
    fetch
  );

  const category = traverseCategoryObj(params.category, categoryResults[0]);

  return {
    categoryToShow: category,
    productArr: productResults,
  };
}
