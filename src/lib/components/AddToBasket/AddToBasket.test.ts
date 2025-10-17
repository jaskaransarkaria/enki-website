import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import AddToBasket from "./AddToBasket.svelte";
import { get } from "svelte/store";
import { basket, reset as resetBasketStore } from "$lib/stores/basket";
import type { SquareProduct } from "$lib/types/product";

describe("GIVEN AddToBasket", () => {
  beforeEach(() => resetBasketStore());

  describe("WHEN rendered without props", () => {
    it("THEN do not display the component", () => {
      render(AddToBasket);
      const { container } = render(AddToBasket);
      expect(container.children).toHaveLength(0);
      expect(
        screen.queryByRole("button", { name: /add to basket/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("WHEN rendered with props", () => {
    it("THEN display the component", () => {
      render(AddToBasket, {
        product: {
          id: "123",
          item_data: {
            name: "Red Jacket",
          },
        } as unknown as SquareProduct,
      });
      expect(
        screen.getByRole("button", { name: /add to basket/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /add to basket/i }),
      ).not.toHaveClass("narrow");
    });

    it("THEN add a new item to the basket", async () => {
      render(AddToBasket, {
        product: {
          id: "123",
          item_data: {
            name: "Red Jacket",
            categories: [{ id: "999" }],
            variations: [
              {
                id: "456",
              },
            ],
          },
        } as unknown as SquareProduct,
        variation: {
          id: "456",
          custom_attribute_values: {
            image_arr: { string_value: "" },
          },
          item_variation_data: {
            price_money: { amount: 1000 },
          },
        },
      });

      expect(get(basket)).toEqual([]);
      await userEvent.click(
        screen.getByRole("button", { name: /add to basket/i }),
      );
      expect(get(basket)).toMatchObject([
        {
          categoryId: "999",
          currentStock: NaN,
          giftDescription: "",
          giftWrap: false,
          giftWrapToUse: "Standard brown paper",
          id: "123",
          imgHash: "/src/lib/assets/coming_soon.png",
          name: "Red Jacket",
          price: 10,
          quantity: 1,
          variationId: "456",
        },
      ]);
      // wait for the animation to finish
      waitFor(() => {
        expect(
          screen.queryByRole("button", { name: /add to basket/i }),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole("button", { name: /goto basket/i }),
        ).toBeInTheDocument();
      });
    });

    it("AND the detailed prop THEN display the narrow styled AddToBasket", () => {
      render(AddToBasket, {
        product: {
          Id: 123,
          Name: "Red jacket",
        } as Product,
        detailed: true,
      });

      expect(
        screen.getByRole("button", { name: /add to basket/i }),
      ).toHaveClass("narrow");
    });
  });
});
