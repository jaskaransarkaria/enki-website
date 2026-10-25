import { browser, dev } from "$app/env";
import { setServerUrl } from "#lib/utils/setServerUrl.js";
import { searchProducts } from "#lib/utils/search.js";
import { refreshProductsFromServer } from "#lib/utils/requests.js";
import type { SquareProduct } from "#lib/types/product.js";

// Escape user input before it is used inside a RegExp so a stray "(" can't
// throw and a crafted term can't inject regex syntax.
const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function load({ fetch, url }) {
  // pull the category data from api
  const result = await refreshProductsFromServer(
    `${setServerUrl(browser, dev)}/get-all-products`,
    fetch,
  );

  const searchTerm = url.searchParams.get("search-term") ?? "";
  const escapedTerm = escapeRegExp(searchTerm);

  // An empty term matches everything, so `/shop/search?search-term=` browses
  // the whole catalog rather than returning nothing.
  const reg = escapedTerm
    ? new RegExp(`\\b${escapedTerm}|${escapedTerm}\\b`, "i")
    : /(?:)/i;
  const wordInTitleReg = escapedTerm
    ? new RegExp(`\\b${escapedTerm}\\b`, "i")
    : /(?:)/i;

  const data = searchProducts(reg, result);

  const sortedData = [
    ...data
      .slice()
      .filter((prod: SquareProduct) =>
        prod.item_data.name.toLowerCase().match(wordInTitleReg),
      ),
    ...data
      .slice()
      .filter(
        (prod: SquareProduct) =>
          !prod.item_data.name.toLowerCase().match(wordInTitleReg),
      ),
  ];

  return {
    data: sortedData,
  };
}
