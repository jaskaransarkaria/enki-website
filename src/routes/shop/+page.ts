import { PUBLIC_SERVER_URL } from "$env/static/public";
import { refreshCategoriesFromServer } from "$lib/utils/requests";
import type { Base } from "$lib/types/base";

const orderCategories = (resp: Base[]) =>
  resp.sort((a: Base, b: Base) => (a.Name < b.Name ? -1 : 1));

export async function load({ fetch, parent }) {
  // pull the category data from api
  const result = await refreshCategoriesFromServer(
    `${PUBLIC_SERVER_URL}/categories`,
    fetch
  );

  return {
    data: orderCategories([...result]),
  };
}
