import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { refreshProductsFromServer } from "$lib/utils/requests";

export async function load({ fetch, params }) {
  // pull the category data from api
  const result = await refreshProductsFromServer(
    `${setServerUrl(browser, dev)}/product?id=${params.product}`,
    fetch
  );

  return {
    productToShow: result,
  };
}
