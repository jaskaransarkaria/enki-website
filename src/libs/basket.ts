import type { BasketProduct } from '@/stores/basket';

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
  },
  ...list.slice(listIndx + 1),
];

const addNewItemToBasket = (
  product: { id: string; name: string },
  list: BasketProduct[]
): BasketProduct[] => [
  {
    id: product.id,
    name: product.name,
    quantity: 1,
  },
  ...list,
];

export const updateBasket = (
  product: { id: string; name: string },
  list: BasketProduct[],
  updateType: string
): BasketProduct[] => {
  const indx = list.findIndex((obj: BasketProduct) => obj.id === product.id);
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
