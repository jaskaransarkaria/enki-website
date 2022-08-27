import type { BasketProduct } from "$lib/stores/basket";
import type { Product } from "$lib/types/product";

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
          categoryId: list[listIndx].categoryId,
          name: list[listIndx].name,
          quantity: list[listIndx].quantity - 1,
          price: list[listIndx].price,
          currentStock: list[listIndx].currentStock,
          giftWrap: list[listIndx].giftWrap ?? false,
          giftDescription: list[listIndx].giftDescription ?? "",
          giftWrapToUse: list[listIndx].giftDescription ?? "",
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
    categoryId: list[listIndx].categoryId,
    name: list[listIndx].name,
    quantity: list[listIndx].quantity + 1,
    price: list[listIndx].price,
    currentStock: list[listIndx].currentStock,
    giftWrap: list[listIndx].giftWrap ?? false,
    giftDescription: list[listIndx].giftDescription ?? "",
    giftWrapToUse: list[listIndx].giftWrapToUse ?? "",
  },
  ...list.slice(listIndx + 1),
];

const addNewItemToBasket = (
  product: Pick<
    Product,
    "Id" | "Name" | "SalePrice" | "CurrentStock" | "CategoryId"
  >,
  list: BasketProduct[]
): BasketProduct[] => [
  {
    id: product?.Id.toString(),
    categoryId: product?.CategoryId,
    name: product?.Name,
    quantity: 1,
    price: product?.SalePrice,
    currentStock: product?.CurrentStock,
    giftWrap: false,
    giftDescription: "",
    giftWrapToUse: "",
  },
  ...list,
];

export const updateBasket = (
  product: Pick<
    Product,
    "Id" | "Name" | "SalePrice" | "CurrentStock" | "CategoryId"
  >,
  list: BasketProduct[],
  updateType: string
): BasketProduct[] => {
  const indx = list.findIndex(
    (obj: BasketProduct) => obj.id === product.Id.toString()
  );
  updateType = indx >= 0 ? updateType : "newItem";
  switch (updateType) {
    case "incrementQuantity":
      return addItemToBasket(list, indx);
    case "decrementQuantity":
      return removeItemFromBasket(list[indx].quantity, list, indx);
    case "newItem":
      return addNewItemToBasket(product, list);
    default:
      return [];
  }
};
