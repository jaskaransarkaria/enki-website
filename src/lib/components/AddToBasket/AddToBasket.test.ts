import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import AddToBasket from "./AddToBasket.svelte";
import { get } from "svelte/store";
import { basket, reset as resetBasketStore } from "$lib/stores/basket";
import type { Product } from "$lib/types/product";

describe("GIVEN AddToBasket", () => {
  beforeEach(() => resetBasketStore());

  describe("WHEN rendered without props", () => {
    it("THEN do not display the component", () => {
      const { container } = render(AddToBasket);
      expect(container.children).toHaveLength(1);
      expect(
        screen.queryByRole("button", { name: /add to basket/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("WHEN rendered with props", () => {
    it("THEN display the component", () => {
      render(AddToBasket, {
        product: {
          Id: 123,
          Name: "Red jacket",
        } as Product,
      });
      expect(
        screen.getByRole("button", { name: /add to basket/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /add to basket/i })
      ).not.toHaveClass("narrow");
    });

    it("THEN add a new item to the basket", async () => {
      render(AddToBasket, {
        product: {
          Id: 123,
          Name: "Red jacket",
        } as Product,
      });

      expect(get(basket)).toEqual([]);
      await userEvent.click(
        screen.getByRole("button", { name: /add to basket/i })
      );
      expect(get(basket)).toMatchObject([
        { id: 123, quantity: 1, name: "Red jacket" },
      ]);
      // wait for the animation to finish
      waitFor(() => {
        expect(
          screen.queryByRole("button", { name: /add to basket/i })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole("button", { name: /goto basket/i })
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
        screen.getByRole("button", { name: /add to basket/i })
      ).toHaveClass("narrow");
    });
  });
});
