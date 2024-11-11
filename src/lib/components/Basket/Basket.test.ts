import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Basket from "./Basket.svelte";
import { get } from "svelte/store";
import { basket, reset as resetBasketStore } from "$lib/stores/basket";
import { updateBasket } from "$lib/utils/basket";

import type { SquareProduct } from "$lib/types/product";

const dummyProduct = {
  id: "123",
  updated_at: "",
  custom_attribute_values: {},
  item_data: {
    name: "Elephant",
    product_type: "",
    categories: [{ id: "999" }],
    is_archived: false,
    ecom_visibility: "VISIBLE",
    description_html: "big animal",
    variations: [
      {
        id: "456",
        custom_attribute_values: {
          image_arr: {
            string_value: "foobar-0-9sjs9s",
          },
        },
        item_variation_data: {
          item_id: "123",
          name: "",
          price_money: {
            amount: 30000,
          },
          quantity: "9",
        },
      },
    ],
  },
} as SquareProduct;

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
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      render(Basket);
      expect(screen.queryAllByTestId("basket-0")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Subtotal: £300.00")[0]).toBeInTheDocument();
    });

    it("THEN display the empty basket image when there are no products in the basket", () => {
      render(Basket);
      expect(
        screen.queryAllByAltText("cartoon of an empty basket")[0]
      ).toHaveAttribute("src", "/src/lib/assets/basket_empty.png");
    });

    it("THEN display the correct total when there are multiple items in the basket", () => {
      const dummyProduct2 = {
        ...dummyProduct,
        item_data: {
          ...dummyProduct.item_data,
          name: "dummy2",
          variations: [
            {
              item_variation_data: { price_money: { amount: 60000 } },
              custom_attribute_values: { image_arr: { string_value: "" } },
            },
          ],
        },
        id: "456",
      } as SquareProduct;
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      basket.set(
        updateBasket(
          dummyProduct2,
          get(basket),
          "newItem",
          dummyProduct2.item_data.variations[0]
        )
      );
      render(Basket);
      expect(screen.queryByTestId("basket-0")).toBeInTheDocument();
      expect(screen.queryByTestId("basket-1")).toBeInTheDocument();
      expect(screen.getAllByText("Subtotal: £900.00")[0]).toBeInTheDocument();
    });

    it("THEN increment an item already in the basket", async () => {
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      render(Basket);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      await userEvent.click(screen.getByText("+"));
      expect(screen.getByText("Subtotal: £600.00")).toBeInTheDocument();
    });

    it("THEN decrement an item already in the basket", async () => {
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      render(Basket);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      await userEvent.click(screen.getByText("+"));
      expect(screen.getByText("Subtotal: £600.00")).toBeInTheDocument();
      await userEvent.click(screen.getByText("-"));
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
    });

    it("THEN remove an item already in the basket", async () => {
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      render(Basket);
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      expect(
        screen.queryByAltText("cartoon of an empty basket")
      ).not.toBeInTheDocument();
      await userEvent.click(screen.getByText("-"));
      expect(
        screen.queryByAltText("cartoon of an empty basket")
      ).toHaveAttribute("src", "/src/lib/assets/basket_empty.png");
    });

    it("THEN add gift wrapping to a product in the basket", async () => {
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      render(Basket);
      expect(
        screen.getByRole("checkbox", { checked: false })
      ).not.toBeChecked();
      expect(screen.getByText("Subtotal: £300.00")).toBeInTheDocument();
      expect(get(basket)).toMatchObject([
        {
          id: "123",
          categoryId: "999",
          currentStock: 9,
          variationId: "456",
          giftDescription: "",
          giftWrapToUse: "Standard brown paper",
          imgHash: "foobar-0-9sjs9s",
          name: "Elephant",
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
          categoryId: "999",
          currentStock: 9,
          variationId: "456",
          giftDescription: "",
          giftWrapToUse: "Standard brown paper",
          imgHash: "foobar-0-9sjs9s",
          name: "Elephant",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);
    });

    it("THEN add a custom gift wrapping product AND use it to wrap another product", async () => {
      const dummyGiftWrapProduct = {
        ...dummyProduct,
        id: "888",
        item_data: {
          ...dummyProduct.item_data,
          name: "dummyGiftWrap",
          categories: [{ id: "32TE2EITCQ6KE4HQ34ORK6V5" }],
          variations: [
            {
              id: "22222",
              item_variation_data: {
                price_money: { amount: 60000 },
                quantity: "2",
              },
              custom_attribute_values: { image_arr: { string_value: "" } },
            },
          ],
        },
      } as SquareProduct;

      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      basket.set(
        updateBasket(
          dummyGiftWrapProduct,
          get(basket),
          "newItem",
          dummyGiftWrapProduct.item_data.variations[0]
        )
      );
      render(Basket);
      // gift wrap products don't have a gift wrap check box
      const allCheckboxes = screen.getAllByRole("checkbox", { checked: false });
      await userEvent.click(allCheckboxes[0]);
      // get the updated total (+ the gift wrap price)
      expect(screen.getAllByText("Subtotal: £900.95")[0]).toBeInTheDocument();
      // check the values on the basket are updated
      expect(get(basket)).toMatchObject([
        {
          id: "888",
          categoryId: "32TE2EITCQ6KE4HQ34ORK6V5",
          currentStock: 2,
          variationId: "22222",
          imgHash: "/src/lib/assets/coming_soon.png",
          giftDescription: "",
          giftWrapToUse: "Standard brown paper",
          name: "dummyGiftWrap",
          quantity: 1,
          giftWrap: false,
          price: 600,
        },
        {
          id: "123",
          categoryId: "999",
          currentStock: 9,
          giftDescription: "",
          giftWrapToUse: "Standard brown paper",
          imgHash: "foobar-0-9sjs9s",
          name: "Elephant",
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
        id: "888",
        item_data: {
          ...dummyProduct.item_data,
          name: "dummyGiftWrap",
          categories: [{ id: "32TE2EITCQ6KE4HQ34ORK6V5" }],
          variations: [
            {
              id: "22222",
              item_variation_data: {
                price_money: { amount: 5555 },
                quantity: "2",
              },
              custom_attribute_values: { image_arr: { string_value: "" } },
            },
          ],
        },
      } as SquareProduct;

      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      basket.set(
        updateBasket(
          dummyGiftWrapProduct,
          get(basket),
          "newItem",
          dummyGiftWrapProduct.item_data.variations[0]
        )
      );
      render(Basket);
      // gift wrap products don't have a gift wrap check box
      const allCheckboxes = screen.getAllByRole("checkbox", { checked: false });
      await userEvent.click(allCheckboxes[0]);

      // updated subtotal with giftwrapping
      expect(screen.getByText("Subtotal: £356.50")).toBeInTheDocument();
      expect(get(basket)).toMatchObject([
        {
          id: "888",
          categoryId: "32TE2EITCQ6KE4HQ34ORK6V5",
          currentStock: 2,
          giftDescription: "",
          giftWrapToUse: "Standard brown paper",
          name: "dummyGiftWrap",
          imgHash: "/src/lib/assets/coming_soon.png",
          variationId: "22222",
          quantity: 1,
          giftWrap: false,
          price: 55.55,
        },
        {
          id: "123",
          categoryId: "999",
          currentStock: 9,
          giftDescription: "",
          imgHash: "foobar-0-9sjs9s",
          variationId: "456",
          giftWrapToUse: "Standard brown paper",
          name: "Elephant",
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
      basket.set(
        updateBasket(
          dummyProduct,
          [],
          "newItem",
          dummyProduct.item_data.variations[0]
        )
      );
      render(Basket);
      const giftWrapCheckbox = screen.getByRole("checkbox", { checked: false });
      // gift wrap products don't have a gift wrap check box
      await userEvent.click(giftWrapCheckbox);

      // updated subtotal with giftwrapping
      expect(screen.getByText("Subtotal: £300.95")).toBeInTheDocument();
      expect(get(basket)).toMatchObject([
        {
          id: "123",
          categoryId: "999",
          currentStock: 9,
          giftDescription: "",
          giftWrapToUse: "Standard brown paper",
          name: "Elephant",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
          imgHash: "foobar-0-9sjs9s",
          variationId: "456",
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
          categoryId: "999",
          imgHash: "foobar-0-9sjs9s",
          variationId: "456",
          currentStock: 9,
          giftDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis lacus, egestas non",
          giftWrapToUse: "Standard brown paper",
          name: "Elephant",
          quantity: 1,
          giftWrap: true,
          price: 300.95,
        },
      ]);
    });
  });
});
