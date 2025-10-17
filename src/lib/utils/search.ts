import type { SquareProduct } from "$lib/types/product";

export const searchProducts = (
  prodToFind: RegExp,
  productsArr: readonly SquareProduct[],
): readonly SquareProduct[] =>
  productsArr
    ?.filter((obj) =>
      "name" in obj.item_data && obj.item_data.name.length > 0
        ? (obj?.item_data.name.toLowerCase().match(prodToFind) ||
            obj?.item_data.description_html.toLowerCase().match(prodToFind)) &&
          obj.item_data.ecom_visibility === "VISIBLE"
        : false,
    )
    .filter((obj) => !obj.item_data.is_archived);
