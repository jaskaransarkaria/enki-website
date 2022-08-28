import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Basket from "./Basket.svelte";
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

describe("GIVEN AddToBasket", () => {
  beforeEach(() => resetBasketStore());

  describe("WHEN rendered without props", () => {
    it("THEN do not display the component", () => {});
    const { container } = render(Basket);
    expect(container.children).toHaveLength(1);
    expect(screen.queryByTestId("basket-0")).not.toBeInTheDocument();
  });

  describe("WHEN rendered with props", () => {
    it("THEN display the component", () => {
      // add items to basket
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      render(Basket);
      expect(screen.queryByTestId("basket-0")).toBeInTheDocument();
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
    });

    it("THEN display the empty basket image when there are no products in the basket", () => {
      render(Basket);
      expect(
        screen.queryByAltText("cartoon of an empty basket")
      ).toHaveAttribute("src", "/basket_empty.png");
    });

    it("THEN display the correct total when there are multiple items in the basket", () => {
      const dummyProduct2 = {
        ...dummyProduct,
        SalePrice: 600,
        Id: 456,
        Name: "dummy2",
      };
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      basket.set(updateBasket(dummyProduct2, get(basket), "newItem"));
      render(Basket);
      expect(screen.queryByTestId("basket-0")).toBeInTheDocument();
      expect(screen.queryByTestId("basket-1")).toBeInTheDocument();
      expect(screen.getByText("Subtotal: £900.00")).toBeInTheDocument();
    });

    it("THEN increment an item already in the basket", async () => {
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      render(Basket);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      await userEvent.click(screen.getByText("+"));
      expect(screen.getByText("Subtotal: £600.00")).toBeInTheDocument();
    });

    it("THEN decrement an item already in the basket", async () => {
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      render(Basket);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      await userEvent.click(screen.getByText("+"));
      expect(screen.getByText("Subtotal: £600.00")).toBeInTheDocument();
      await userEvent.click(screen.getByText("-"));
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
    });

    it("THEN remove an item already in the basket", async () => {
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      render(Basket);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      expect(
        screen.queryByAltText("cartoon of an empty basket")
      ).not.toBeInTheDocument();
      await userEvent.click(screen.getByText("-"));
      expect(
        screen.queryByAltText("cartoon of an empty basket")
      ).toHaveAttribute("src", "/basket_empty.png");
    });

    it("THEN add gift wrapping to a product in the basket", async () => {
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      render(Basket);
      expect(
        screen.getByRole("checkbox", { checked: false })
      ).not.toBeChecked();
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      expect(get(basket)).toMatchObject([
        {
          id: "123",
          categoryId: 999,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummy",
          quantity: 1,
          giftWrap: false,
          price: 300,
        },
      ]);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      await userEvent.click(screen.getByRole("checkbox", { checked: false }));
      expect(screen.getByRole("checkbox", { checked: true })).toBeChecked();
      // get the updated total (+ the gift wrap price)
      expect(screen.getByText("Subtotal: £300.95")).toBeInTheDocument();
      expect(
        screen.queryByText("Subtotal: £300.00", { exact: true })
      ).not.toBeInTheDocument();
      // check the values on the basket are updated
      expect(get(basket)).toMatchObject([
        {
          id: "123",
          categoryId: 999,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummy",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);
    });

    it("THEN add a custom gift wrapping product AND use it to wrap another product", async () => {
      const dummyGiftWrapProduct = {
        ...dummyProduct,
        SalePrice: 600,
        Id: 456,
        Name: "dummyGiftWrap",
        CategoryId: 1876089,
      };
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      basket.set(updateBasket(dummyGiftWrapProduct, get(basket), "newItem"));
      render(Basket);
      // gift wrap products don't have a gift wrap check box
      const allCheckboxes = screen.getAllByRole("checkbox", { checked: false });
      await userEvent.click(allCheckboxes[0]);
      // get the updated total (+ the gift wrap price)
      expect(screen.getByText("Subtotal: £900.95")).toBeInTheDocument();
      // check the values on the basket are updated
      expect(get(basket)).toMatchObject([
        {
          id: "456",
          categoryId: 1876089,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummyGiftWrap",
          quantity: 1,
          giftWrap: false,
          price: 600,
        },
        {
          id: "123",
          categoryId: 999,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummy",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);
      // select gift wrap
      expect(
        (
          screen.getByRole("option", {
            name: "dummyGiftWrap",
          }) as HTMLOptionElement
        ).selected
      ).toBeFalsy();

      await userEvent.selectOptions(screen.getByRole("combobox"), [
        "dummyGiftWrap",
      ]);

      expect(
        (
          screen.getByRole("option", {
            name: "dummyGiftWrap",
          }) as HTMLOptionElement
        ).selected
      ).toBeTruthy();
      expect(
        (
          screen.getByRole("option", {
            name: "Standard brown paper",
          }) as HTMLOptionElement
        ).selected
      ).toBeFalsy();
    });

    it("THEN remove gift wrapping", async () => {
      const dummyGiftWrapProduct = {
        ...dummyProduct,
        SalePrice: 55.55,
        Id: 456,
        Name: "dummyGiftWrap",
        CategoryId: 1876089,
      };
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      basket.set(updateBasket(dummyGiftWrapProduct, get(basket), "newItem"));
      render(Basket);
      // gift wrap products don't have a gift wrap check box
      const allCheckboxes = screen.getAllByRole("checkbox", { checked: false });
      await userEvent.click(allCheckboxes[0]);

      // updated subtotal with giftwrapping
      expect(screen.getByText("Subtotal: £356.50")).toBeInTheDocument();
      expect(get(basket)).toMatchObject([
        {
          id: "456",
          categoryId: 1876089,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummyGiftWrap",
          quantity: 1,
          giftWrap: false,
          price: 55.55,
        },
        {
          id: "123",
          categoryId: 999,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummy",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);

      await userEvent.selectOptions(screen.getByRole("combobox"), [
        "dummyGiftWrap",
      ]);

      // expect gift wrap options to be available
      expect(
        (
          screen.getByRole("option", {
            name: "dummyGiftWrap",
          }) as HTMLOptionElement
        ).selected
      ).toBeTruthy();
      expect(
        (
          screen.getByRole("option", {
            name: "Standard brown paper",
          }) as HTMLOptionElement
        ).selected
      ).toBeFalsy();

      // remove gift wrapping
      await userEvent.click(allCheckboxes[0]);

      // subtotal removes gift wrapping charge
      expect(screen.getByText("Subtotal: £355.55")).toBeInTheDocument();
      expect(
        screen.queryByRole("option", {
          name: "Standard brown paper",
        }) as HTMLOptionElement
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("option", {
          name: "dummyGiftWrap",
        }) as HTMLOptionElement
      ).not.toBeInTheDocument();
    });

    it("THEN add gift wrapping description", async () => {
      basket.set(updateBasket(dummyProduct, [], "newItem"));
      render(Basket);
      const giftWrapCheckbox = screen.getByRole("checkbox", { checked: false });
      // gift wrap products don't have a gift wrap check box
      await userEvent.click(giftWrapCheckbox);

      // updated subtotal with giftwrapping
      expect(screen.getByText("Subtotal: £300.95")).toBeInTheDocument();
      expect(get(basket)).toMatchObject([
        {
          id: "123",
          categoryId: 999,
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "",
          name: "dummy",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);

      await userEvent.selectOptions(screen.getByRole("combobox"), [
        "Standard brown paper",
      ]);

      // expect gift wrap options to be available
      expect(
        (
          screen.getByRole("option", {
            name: "Standard brown paper",
          }) as HTMLOptionElement
        ).selected
      ).toBeTruthy();

      // add gift wrap description 92 characters (max is 95)
      await userEvent.type(
        screen.getByRole("textbox"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis lacus, egestas non"
      );

      expect(get(basket)).toMatchObject([
        {
          id: "123",
          categoryId: 999,
          currentStock: 2,
          giftDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis lacus, egestas non",
          giftWrapToUse: "Standard brown paper",
          name: "dummy",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);
    });
  });
});
