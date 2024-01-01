import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import {
  refreshCategoryFromServer,
  refreshProductsFromServer,
  refreshTagsFromServer,
} from "$lib/utils/requests";

import type { Category } from "$lib/types/category";
import type { Tag } from "$lib/types/tag";

const traverseCategoryObj = (
  id: number,
  returnedCategoryObj: Category
): Category => {
  if (returnedCategoryObj?.Id === id) {
    return returnedCategoryObj;
  } else if (returnedCategoryObj?.Children) {
    // search each category/children branch recursively
    for (const cat of returnedCategoryObj.Children) {
      if (cat.Id === id) {
        return cat;
      } else if (cat.Children) {
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
  // pull the category data from api
  let tags: readonly Tag[] = [];
  const id = parseInt(params.category, 10);

  const categoryResults = await refreshCategoryFromServer(
    `${PUBLIC_SERVER_URL}/category?id=${params.category}`,
    fetch
  );

  const productResults = await refreshProductsFromServer(
    `${setServerUrl(browser, dev)}/products-by-category?id=${params.category}`,
    fetch
  );

  if ([1875997, 1875998].includes(id)) {
    tags = await refreshTagsFromServer(
      `${setServerUrl(browser, dev)}/tags`,
      fetch
    );
  }

  const category = traverseCategoryObj(id, categoryResults[0]);

  return {
    categoryToShow: category,
    productArr: productResults,
    tags,
  };
}
