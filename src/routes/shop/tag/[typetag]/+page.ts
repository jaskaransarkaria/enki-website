import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { refreshProductsFromServer } from "$lib/utils/requests";

export async function load({ fetch, params }) {
  // pull the category data from api
  const result = await refreshProductsFromServer(
    `${setServerUrl(browser, dev)}/get-all-products`,
    fetch
  );

  const filteredResult = result?.filter((obj) =>
    "ProductTags" in obj && obj?.ProductTags.length
      ? obj.ProductTags.filter(
          (tag) => tag.Name.toLowerCase() === `${params.typetag}`
        ).length
        ? true
        : false
      : false
  );

  return {
    data: filteredResult,
  };
}
