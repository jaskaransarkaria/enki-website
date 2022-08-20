import {
  refreshCategoryFromServer,
  refreshProductsFromServer,
} from "$lib/utils/requests";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import type { Category } from "$lib/types/category";

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

export async function load({ fetch, params, parent }) {
  // pull the category data from api
  const categoryResults = await refreshCategoryFromServer(
    `${PUBLIC_SERVER_URL}/category?id=${params.category}`,
    fetch
  );

  const productResults = await refreshProductsFromServer(
    `${PUBLIC_SERVER_URL}/products-by-category?id=${params.category}`,
    fetch
  );

  const category = traverseCategoryObj(
    parseInt(params.category, 10),
    categoryResults[0]
  );

  return {
    categoryToShow: category,
    productArr: productResults,
  };
}
