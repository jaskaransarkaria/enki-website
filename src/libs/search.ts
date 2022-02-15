import type { Product } from '@/types/product';

export const searchProducts = (
  prodToFind: RegExp,
  productsArr: readonly Product[]
): readonly Product[] =>
  productsArr.filter((obj) => obj?.Name.toLowerCase().match(prodToFind));
