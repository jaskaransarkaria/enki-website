import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import BasketCounter from "./BasketCounter.svelte";
import { get } from "svelte/store";
import { basket, reset as resetBasketStore } from "$lib/stores/basket";
import { updateBasket } from "$lib/utils/basket";

import type { Product } from "$lib/types/product";

const dummyProduct = {
  Id: 123,
  Name: "dummy",
  SalePrice: 300,
  CurrentStock: 2,
  CategoryId: 999,
} as Product;

const dummyBasketProduct = {
  id: 123,
  categoryId: 999,
  currentStock: 2,
  giftDescription: "",
  giftWrapToUse: "Standard brown paper",
  name: "dummy",
  quantity: 1,
  giftWrap: false,
  price: 300,
};

describe("GIVEN BasketCounter", () => {
  beforeEach(() => resetBasketStore());

  it("increment the quantity of the product in the basket", async () => {
    // add items to basket
    basket.set(updateBasket(dummyProduct, [], "newItem"));
    render(BasketCounter, { productObj: dummyBasketProduct });
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("+"));
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 2,
        giftWrap: false,
        price: 300,
      },
    ]);
  });

  it("decrement the quantity of the product in the basket", async () => {
    // add items to basket
    basket.set(updateBasket(dummyProduct, [], "newItem"));
    render(BasketCounter, { productObj: dummyBasketProduct });
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("+"));
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 2,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("-"));
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
  });

  it("decrement the quantity of the product in the basket to 0", async () => {
    // add items to basket
    basket.set(updateBasket(dummyProduct, [], "newItem"));
    render(BasketCounter, { productObj: dummyBasketProduct });
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("+"));
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 2,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("-"));
    expect(get(basket)).toMatchObject([
      {
        id: 123,
        categoryId: 999,
        currentStock: 2,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
        name: "dummy",
        quantity: 1,
        giftWrap: false,
        price: 300,
      },
    ]);
    await userEvent.click(screen.getByText("-"));
    expect(get(basket)).toMatchObject([]);
  });
});
