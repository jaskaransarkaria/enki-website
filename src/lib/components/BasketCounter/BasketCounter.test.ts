import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import BasketCounter from "./BasketCounter.svelte";
import { get } from "svelte/store";
import { basket, reset as resetBasketStore } from "$lib/stores/basket";
import { updateBasket } from "$lib/utils/basket";

import type { SquareProduct } from "$lib/types/product";

const dummyProduct = {
  id: "555",
  updated_at: "",
  custom_attribute_values: {},
  item_data: {
    name: "Purple jacket",
    product_type: "",
    categories: [{ id: "888" }],
    is_archived: false,
    ecom_visibility: "VISIBLE",
    description_html: "leathery",
    variations: [
      {
        id: "999",
        custom_attribute_values: {
          image_arr: {
            string_value: "foobar-0-9sjs9s",
          },
        },
        item_variation_data: {
          item_id: "798",
          name: "",
          price_money: {
            amount: 30000,
          },
          quantity: "5",
        },
      },
    ],
  },
} as SquareProduct;

const dummyBasketProduct = {
  id: "555",
  categoryId: "888",
  variationId: "999",
  currentStock: 5,
  giftDescription: "",
  giftWrapToUse: "Standard brown paper",
  imgHash: "foobar-0-9sjs9s",
  name: "Purple jacket",
  quantity: 1,
  giftWrap: false,
  price: 300,
};

describe("GIVEN BasketCounter", () => {
  beforeEach(() => resetBasketStore());

  it("increment the quantity of the product in the basket", async () => {
    basket.set(
      updateBasket(
        dummyProduct,
        [],
        "newItem",
        dummyProduct.item_data.variations[0]
      )
    );
    render(BasketCounter, { productObj: dummyBasketProduct });
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("+"));
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 2,
        giftWrap: false,
        price: 300,
      },
    ]);
  });

  it("decrement the quantity of the product in the basket", async () => {
    basket.set(
      updateBasket(
        dummyProduct,
        [],
        "newItem",
        dummyProduct.item_data.variations[0]
      )
    );
    render(BasketCounter, { productObj: dummyBasketProduct });
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("+"));
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 2,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("-"));
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
  });

  it("decrement the quantity of the product in the basket to 0", async () => {
    basket.set(
      updateBasket(
        dummyProduct,
        [],
        "newItem",
        dummyProduct.item_data.variations[0]
      )
    );
    render(BasketCounter, { productObj: dummyBasketProduct });
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("+"));
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 2,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("-"));
    expect(get(basket)).toMatchObject([
      {
        id: "555",
        categoryId: "888",
        variationId: "999",
        currentStock: 5,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        imgHash: "foobar-0-9sjs9s",
        name: "Purple jacket",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("-"));
    expect(get(basket)).toMatchObject([]);
  });
});
