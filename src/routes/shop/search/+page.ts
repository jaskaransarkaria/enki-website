import { refreshProductsFromServer } from "$lib/utils/requests";
import { searchProducts } from "$lib/utils/search";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import type { Product } from "$lib/types/product";

export async function load({ fetch, url }) {
  // pull the category data from api
  const result = await refreshProductsFromServer(
    `${PUBLIC_SERVER_URL}/get-all-products`,
    fetch
  );

  const searchTerm = decodeURIComponent(url.searchParams.get("search-term"));
  const reg = new RegExp(`\\b${searchTerm}|${searchTerm}\\b`, "i");
  const wordInTitleReg = new RegExp(`\\b${searchTerm}\\b`, "i");

  const data = searchProducts(reg, result);

  const sortedData = [
    ...data
      .slice()
      .filter((prod: Product) => prod.Name.toLowerCase().match(wordInTitleReg)),
    ...data
      .slice()
      .filter(
        (prod: Product) => !prod.Name.toLowerCase().match(wordInTitleReg)
      ),
  ];

  return {
    data: sortedData,
  };
}

export const router = false;