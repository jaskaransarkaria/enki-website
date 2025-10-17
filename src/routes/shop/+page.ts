import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { refreshCategoriesFromServer } from "$lib/utils/requests";
import type { SquareCategory } from "$lib/types/category";

const orderCategories = (resp: SquareCategory[]) =>
  resp.sort(
    (a: SquareCategory, b: SquareCategory) =>
      a.category_data.parent_category.ordinal -
      b.category_data.parent_category.ordinal,
  );

export async function load({ fetch }) {
  // pull the category data from api
  const result = await refreshCategoriesFromServer(
    `${setServerUrl(browser, dev)}/categories`,
    fetch,
  );

  return {
    data: orderCategories([...result]),
  };
}
