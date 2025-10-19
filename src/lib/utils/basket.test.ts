import { updateBasket } from "./basket";
import type { SquareProduct } from "$lib/types/product";

const mockProduct = {
  id: "123",
  updated_at: "",
  custom_attribute_values: {},
  item_data: {
    name: "Red Jacket",
    product_type: "",
    categories: [{ id: "999" }],
    is_archived: false,
    ecom_visibility: "VISIBLE",
    description_html: "big animal",
    variations: [
      {
        id: "123",
        custom_attribute_values: {
          image_arr: {
            string_value: "foobar-0-9sjs9s",
          },
        },
        item_variation_data: {
          name: "",
          price_money: {
            amount: 2000,
          },
          quantity: "1",
        },
      },
    ],
  },
} as SquareProduct;

describe("GIVEN updateBasket()", () => {
  it("WHEN adding a new item THEN add it to the basket", () => {
    expect(
      updateBasket(
        mockProduct,
        [],
        "newItem",
        mockProduct.item_data.variations[0],
      ),
    ).toStrictEqual([
      {
        id: mockProduct.id,
        categoryId: mockProduct.item_data.categories[0].id,
        name: mockProduct.item_data.name,
        variationId: mockProduct.item_data.variations[0].id,
        quantity: 1,
        imgHash: "foobar-0-9sjs9s",
        price:
          mockProduct.item_data.variations[0].item_variation_data.price_money
            .amount / 100,
        currentStock: parseInt(
          mockProduct.item_data.variations[0].item_variation_data.quantity,
          10,
        ),
        giftWrap: false,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
      },
    ]);
  });

  it("WHEN incrementing the quantity of an item already in a basket THEN increment the quantity", () => {
    expect(
      updateBasket(
        mockProduct,
        [
          {
            id: mockProduct.id,
            categoryId: mockProduct.item_data.categories[0].id,
            name: mockProduct.item_data.name,
            variationId: mockProduct.item_data.variations[0].id,
            quantity: 1,
            imgHash: "foobar-0-9sjs9s",
            price:
              mockProduct.item_data.variations[0].item_variation_data
                .price_money.amount / 100,
            currentStock: parseInt(
              mockProduct.item_data.variations[0].item_variation_data.quantity,
              10,
            ),
            giftWrap: false,
            giftDescription: "",
            giftWrapToUse: "Standard brown paper",
          },
        ],
        "incrementQuantity",
        mockProduct.item_data.variations[0],
      ),
    ).toStrictEqual([
      {
        id: mockProduct.id,
        categoryId: mockProduct.item_data.categories[0].id,
        name: mockProduct.item_data.name,
        variationId: mockProduct.item_data.variations[0].id,
        quantity: 2,
        imgHash: "foobar-0-9sjs9s",
        price:
          mockProduct.item_data.variations[0].item_variation_data.price_money
            .amount / 100,
        currentStock: parseInt(
          mockProduct.item_data.variations[0].item_variation_data.quantity,
          10,
        ),
        giftWrap: false,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
      },
    ]);
  });

  it("WHEN decrementing the quantity of an item already in a basket THEN decrement the quantity", () => {
    expect(
      updateBasket(
        mockProduct,
        [
          {
            id: mockProduct.id,
            categoryId: mockProduct.item_data.categories[0].id,
            name: mockProduct.item_data.name,
            variationId: mockProduct.item_data.variations[0].id,
            quantity: 2,
            imgHash: "foobar-0-9sjs9s",
            price:
              mockProduct.item_data.variations[0].item_variation_data
                .price_money.amount,
            currentStock: parseInt(
              mockProduct.item_data.variations[0].item_variation_data.quantity,
              10,
            ),
            giftWrap: false,
            giftDescription: "",
            giftWrapToUse: "Standard brown paper",
          },
        ],
        "decrementQuantity",
        mockProduct.item_data.variations[0],
      ),
    ).toStrictEqual([
      {
        id: mockProduct.id,
        categoryId: mockProduct.item_data.categories[0].id,
        name: mockProduct.item_data.name,
        variationId: mockProduct.item_data.variations[0].id,
        quantity: 1,
        imgHash: "foobar-0-9sjs9s",
        price:
          mockProduct.item_data.variations[0].item_variation_data.price_money
            .amount,
        currentStock: parseInt(
          mockProduct.item_data.variations[0].item_variation_data.quantity,
          10,
        ),
        giftWrap: false,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
      },
    ]);
  });

  it("WHEN decrementing the quantity of an item already in a basket and with a quantity of 1 THEN remove the item", () => {
    expect(
      updateBasket(
        mockProduct,
        [
          {
            id: mockProduct.id,
            categoryId: mockProduct.item_data.categories[0].id,
            name: mockProduct.item_data.name,
            variationId: mockProduct.item_data.variations[0].id,
            quantity: 1,
            imgHash: "foobar-0-9sjs9s",
            price:
              mockProduct.item_data.variations[0].item_variation_data
                .price_money.amount,
            currentStock: parseInt(
              mockProduct.item_data.variations[0].item_variation_data.quantity,
              10,
            ),
            giftWrap: false,
            giftDescription: "",
            giftWrapToUse: "Standard brown paper",
          },
        ],
        "decrementQuantity",
        mockProduct.item_data.variations[0],
      ),
    ).toStrictEqual([]);
  });
});
