import type { BasketProduct } from '@/stores/basket';
import type { Product } from '@/types/product';

const removeItemFromBasket = (
  currentQuantity: number,
  list: BasketProduct[],
  listIndx: number
): BasketProduct[] =>
  currentQuantity === 1
    ? [...list.slice(0, listIndx), ...list.slice(listIndx + 1)]
    : [
        ...list.slice(0, listIndx),
        {
          id: list[listIndx].id,
          name: list[listIndx].name,
          quantity: list[listIndx].quantity - 1,
          price: list[listIndx].price,
          currentStock: list[listIndx].currentStock,
        },
        ...list.slice(listIndx + 1),
      ];

const addItemToBasket = (
  list: BasketProduct[],
  listIndx: number
): BasketProduct[] => [
  ...list.slice(0, listIndx),
  {
    id: list[listIndx].id,
    name: list[listIndx].name,
    quantity: list[listIndx].quantity + 1,
    price: list[listIndx].price,
    currentStock: list[listIndx].currentStock,
  },
  ...list.slice(listIndx + 1),
];

const addNewItemToBasket = (
  product: Pick<Product, 'Id' | 'Name' | 'SalePrice' | 'CurrentStock'>,
  list: BasketProduct[]
): BasketProduct[] => [
  {
    id: product.Id.toString(),
    name: product.Name,
    quantity: 1,
    price: product.SalePrice,
    currentStock: product.CurrentStock,
  },
  ...list,
];

export const updateBasket = (
  product: Pick<Product, 'Id' | 'Name' | 'SalePrice' | 'CurrentStock'>,
  list: BasketProduct[],
  updateType: string
): BasketProduct[] => {
  const indx = list.findIndex(
    (obj: BasketProduct) => obj.id === product.Id.toString()
  );
  updateType = indx >= 0 ? updateType : 'newItem';
  switch (updateType) {
    case 'incrementQuantity':
      return addItemToBasket(list, indx);
    case 'decrementQuantity':
      return removeItemFromBasket(list[indx].quantity, list, indx);
    case 'newItem':
      return addNewItemToBasket(product, list);
    default:
      return [];
  }
};
