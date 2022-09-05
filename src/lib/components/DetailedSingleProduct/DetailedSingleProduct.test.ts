import { tick } from "svelte";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import DetailedSingleProduct from "./DetailedSingleProduct.svelte";

import type { Product } from "$lib/types/product";

const dummyProduct = {
  Name: "Dummy",
  CategoryId: 123,
  Description: "",
  SalePrice: 10,
  ProductImages: [],
  ProductTags: [],
  VariantGroupId: 111,
  CurrentStock: 5,
  ProductDetails: null,
  SellOnWeb: true,
  IsArchived: false,
  Id: 111,
};

window.scrollTo = jest.fn();

describe("GIVEN DetailedSingleProduct", () => {
  afterEach(() => vi.clearAllMocks());

  describe("WHEN rendered", () => {
    it("THEN display the product", () => {
      render(DetailedSingleProduct, {
        product: dummyProduct,
        isMobile: false,
        productDescription: "some dummy description",
      });

      expect(
        screen.getByRole("heading", { level: 2, name: "Dummy" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 2, name: "Dummy" })
      ).not.toHaveClass("mobile-prod-name");
      expect(
        screen.getByRole("heading", { level: 4, name: "£10.00" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", {
          level: 4,
          name: "some dummy description",
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
        productDescription: "some dummy description",
      });

      expect(screen.queryByTestId("full-screen")).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId("desktop-img-container"));

      expect(screen.getByTestId("full-screen")).toBeInTheDocument();
      expect(screen.getByTestId("full-screen")).toBeVisible();
      expect(screen.getByTestId("full-screen")).toHaveClass("full-screen");
    });

    it.skip("THEN close full screen");
    it.skip("THEN display formatted product description");
  });

  describe("WHEN MOBILE is rendered", () => {
    it("THEN display the MOBILE product", () => {
      render(DetailedSingleProduct, {
        product: dummyProduct,
        isMobile: true,
        productDescription: "some dummy description",
      });

      expect(
        screen.getByRole("heading", { level: 4, name: "Dummy" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 4, name: "Dummy" })
      ).toHaveClass("mobile-prod-name");
      expect(
        screen.getByRole("heading", { level: 4, name: "£10.00" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", {
          level: 4,
          name: "some dummy description",
        })
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

      expect(screen.queryByTestId("full-screen")).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId("mobile-img-container"));

      expect(screen.getByTestId("full-screen")).toBeInTheDocument();
      expect(screen.getByTestId("full-screen")).toBeVisible();
      expect(screen.getByTestId("full-screen")).toHaveClass("full-screen");
    });

    it.skip("THEN close MOBILE full screen");
    it.skip("THEN display formatted product description");
  });
});
