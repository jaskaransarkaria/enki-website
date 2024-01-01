import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { refreshCategoriesFromServer } from "$lib/utils/requests";
import type { Base } from "$lib/types/base";

const orderCategories = (resp: Base[]) =>
  resp.sort((a: Base, b: Base) => (a.Name < b.Name ? -1 : 1));

export async function load({ fetch }) {
  // pull the category data from api
  const result = await refreshCategoriesFromServer(
    `${setServerUrl(browser, dev)}/categories`,
    fetch
  );

  return {
    data: orderCategories([...result]),
  };
}
