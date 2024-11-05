import comingSoon from "$lib/assets/coming_soon.png";
import type { BasketProduct } from "$lib/types/basketProduct";
import type { SquareProduct, VariationData } from "$lib/types/product";

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
          variationId: list[listIndx].variationId,
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
    variationId: list[listIndx].variationId,
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
  product: SquareProduct,
  variation: VariationData,
  list: BasketProduct[]
): BasketProduct[] => [
  {
    id: product.id,
    categoryId: product.item_data.categories[0].id,
    name: product.item_data.name,
    variationId: variation.id,
    quantity: 1,
    imgHash:
      variation.custom_attribute_values.image_arr.string_value.length > 0
        ? variation.custom_attribute_values.image_arr.string_value.split(",")[0]
        : comingSoon,
    price: variation.item_variation_data.price_money.amount / 100,
    currentStock: parseInt(variation.item_variation_data.quantity, 10),
    giftWrap: false,
    giftDescription: "",
    giftWrapToUse: "Standard brown paper",
  },
  ...list,
];

export const updateBasket = (
  product: SquareProduct,
  list: BasketProduct[],
  updateType: string,
  variation: VariationData
): BasketProduct[] => {
  const indx = list.findIndex((obj: BasketProduct) => obj.id === product.id);

  updateType = indx >= 0 ? updateType : "newItem";

  switch (updateType) {
    case "incrementQuantity":
      return addItemToBasket(list, indx);
    case "decrementQuantity":
      return removeItemFromBasket(list[indx].quantity, list, indx);
    case "newItem":
      return addNewItemToBasket(product, variation, list);
    default:
      return [];
  }
};
