import type { Product } from "$lib/types/product";

export const searchProducts = (
  prodToFind: RegExp,
  productsArr: readonly Product[]
): readonly Product[] =>
  productsArr?.filter((obj) =>
    "Name" in obj
      ? (obj?.Name.toLowerCase().match(prodToFind) ||
          obj?.Description.toLowerCase().match(prodToFind) ||
          obj?.ProductDetails?.DetailedDescription.toLowerCase().match(
            prodToFind
          )) &&
        obj.SellOnWeb &&
        !obj.IsArchived
      : false
  );
