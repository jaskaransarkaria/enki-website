import comingSoon from "$lib/assets/coming_soon.png";
import type { BasketProduct } from "$lib/types/basketProduct";
import type { Product } from "$lib/types/product";
import { getImageFilename } from "$lib/utils/getImageFilename";

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
          imgHash: list[listIndx].imgHash,
          price: list[listIndx].price,
          currentStock: list[listIndx].currentStock,
          giftWrap: list[listIndx].giftWrap ?? false,
          giftDescription: list[listIndx].giftDescription ?? "",
          giftWrapToUse: list[listIndx].giftWrapToUse ?? "Standard brown paper",
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
    imgHash: list[listIndx].imgHash,
    price: list[listIndx].price,
    currentStock: list[listIndx].currentStock,
    giftWrap: list[listIndx].giftWrap ?? false,
    giftDescription: list[listIndx].giftDescription ?? "",
    giftWrapToUse: list[listIndx].giftWrapToUse ?? "Standard brown paper",
  },
  ...list.slice(listIndx + 1),
];

const addNewItemToBasket = (
  product: Pick<
    Product,
    | "Id"
    | "Name"
    | "SalePrice"
    | "CurrentStock"
    | "CategoryId"
    | "ProductImages"
  >,
  list: BasketProduct[]
): BasketProduct[] => [
  {
    id: product.Id,
    categoryId: product.CategoryId,
    name: product.Name,
    quantity: 1,
    imgHash:
      product?.ProductImages?.length > 0
        ? getImageFilename(product.ProductImages[0].ImageUrl)
        : comingSoon,
    price: product.SalePrice,
    currentStock: product.CurrentStock,
    giftWrap: false,
    giftDescription: "",
    giftWrapToUse: "Standard brown paper",
  },
  ...list,
];

export const updateBasket = (
  product: Pick<
    Product,
    | "Id"
    | "Name"
    | "SalePrice"
    | "CurrentStock"
    | "CategoryId"
    | "ProductImages"
  >,
  list: BasketProduct[],
  updateType: string
): BasketProduct[] => {
  const indx = list.findIndex((obj: BasketProduct) => obj.id === product.Id);
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
