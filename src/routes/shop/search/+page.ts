import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { searchProducts } from "$lib/utils/search";
import { refreshProductsFromServer } from "$lib/utils/requests";
import type { SquareProduct } from "$lib/types/product";

export async function load({ fetch, url }) {
  // pull the category data from api
  const result = await refreshProductsFromServer(
    `${setServerUrl(browser, dev)}/get-all-products`,
    fetch
  );

  const searchTerm = decodeURIComponent(url.searchParams.get("search-term"));
  const reg = new RegExp(`\\b${searchTerm}|${searchTerm}\\b`, "i");
  const wordInTitleReg = new RegExp(`\\b${searchTerm}\\b`, "i");

  const data = searchProducts(reg, result);

  const sortedData = [
    ...data
      .slice()
      .filter((prod: SquareProduct) =>
        prod.item_data.name.toLowerCase().match(wordInTitleReg)
      ),
    ...data
      .slice()
      .filter(
        (prod: SquareProduct) =>
          !prod.item_data.name.toLowerCase().match(wordInTitleReg)
      ),
  ];

  return {
    data: sortedData,
  };
}
