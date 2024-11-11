import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { SquareProduct } from "$lib/types/product";
//import { tick } from "svelte";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import DetailedSingleProduct from "./DetailedSingleProduct.svelte";

const dummyProduct = {
  id: "111",
  updated_at: "",
  custom_attribute_values: {},
  item_data: {
    name: "Red Jacket",
    product_type: "",
    categories: [{ id: "123" }],
    is_archived: false,
    ecom_visibility: "VISIBLE",
    description_html: "<h4>Dummy<h4>",
    variations: [
      {
        id: "123",
        custom_attribute_values: {
          image_arr: {
            string_value: "foobar-0.jpg",
          },
        },
        item_variation_data: {
          name: "",
          price_money: {
            amount: 1000,
          },
          quantity: "5",
        },
      },
    ],
  },
} as SquareProduct;

window.scrollTo = jest.fn();

describe("GIVEN DetailedSingleProduct", () => {
  afterEach(() => vi.clearAllMocks());

  describe("WHEN rendered", () => {
    it("THEN display the product", () => {
      const descProd = {
        ...dummyProduct,
        item_data: {
          ...dummyProduct.item_data,
          description_html: "<h2>Dummy</h2><h4>Dummy</h4>",
        },
      };
      render(DetailedSingleProduct, {
        product: descProd,
        isMobile: false,
      });

      expect(
        screen.getByRole("heading", { level: 2, name: "Dummy" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 4, name: "£10.00" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", {
          level: 4,
          name: "Dummy",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 5, name: "5 in stock" })
      ).toBeVisible();
    });

    it("THEN display full screen", async () => {
      render(DetailedSingleProduct, {
        product: dummyProduct,
        isMobile: false,
      });
    });

    it("THEN display formatted product description", () => {
      const descProd = {
        ...dummyProduct,
        item_data: {
          ...dummyProduct.item_data,
          description_html: "<h4>Dummy</h4><h4>yup</h4><h4>doubleeyes</h4>",
        },
      };
      render(DetailedSingleProduct, {
        product: descProd,
        isMobile: false,
      });

      expect(
        screen.getByRole("heading", {
          level: 4,
          name: "Dummy",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 4, name: "yup" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 4, name: "doubleeyes" })
      ).toBeVisible();
    });
  });

  describe("WHEN MOBILE is rendered", () => {
    it("THEN display the MOBILE product", () => {
      render(DetailedSingleProduct, {
        product: dummyProduct,
        isMobile: true,
      });

      expect(
        screen.getByRole("heading", { level: 4, name: "Dummy" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 4, name: "£10.00" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 4, name: "5 in stock" })
      ).toBeVisible();
    });

    it("THEN display MOBILE full screen", async () => {
      render(DetailedSingleProduct, {
        product: dummyProduct,
        isMobile: true,
        productDescription: "some dummy description",
      });
    });

    it("THEN close MOBILE full screen", async () => {
      render(DetailedSingleProduct, {
        product: dummyProduct,
        isMobile: true,
        productDescription: "some dummy description",
      });
    });
  });
});
