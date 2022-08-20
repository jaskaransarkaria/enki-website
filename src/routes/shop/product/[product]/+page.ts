import { refreshProductsFromServer } from "$lib/utils/requests";
import { PUBLIC_SERVER_URL } from "$env/static/public";

export async function load({ fetch, params, parent }) {
  // pull the category data from api
  const result = await refreshProductsFromServer(
    `${PUBLIC_SERVER_URL}/product?id=${params.product}`,
    fetch
  );

  const { whitelistedUserAgent } = await parent();

  return {
    productToShow: result,
    whitelistedUserAgent,
  };
}
