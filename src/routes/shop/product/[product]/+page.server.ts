import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { refreshProductsFromServer } from "$lib/utils/requests";

export async function load({ fetch, params }) {
  return {
    productToShow: await refreshProductsFromServer(
      `${setServerUrl(browser, dev)}/product?id=${params.product}`,
      fetch
    ),
  };
}
