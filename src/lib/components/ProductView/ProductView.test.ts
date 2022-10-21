import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import ProductView from "./ProductView.svelte";

import type { Product } from "$lib/types/product";
import ProductView__SvelteComponent_ from "./ProductView.svelte";
import { expect } from "vitest";

const mockData: readonly Product[] = [
  {
    Id: 123,
    Name: "Elephant",
    CategoryId: 999,
    Description: "big animal",
    SalePrice: 90,
    ProductImages: [],
    ProductTags: [],
    VariantGroupId: null,
    CurrentStock: 9,
    ProductDetails: {
      DetailedDescription: "heavy",
    },
    SellOnWeb: true,
    IsArchived: false,
  },
  {
    Id: 456,
    Name: "Dog",
    CategoryId: 999,
    Description: "cute animal",
    SalePrice: 10,
    ProductImages: [],
    ProductTags: [],
    VariantGroupId: null,
    CurrentStock: 5,
    ProductDetails: {
      DetailedDescription: "loving",
    },
    SellOnWeb: true,
    IsArchived: false,
  },
];

describe("GIVEN ProductView", () => {
  const orignalLocation = global.window.location;

  afterEach(() => {
    global.window.location = orignalLocation;
  });

  describe("WHEN rendered with no prop", () => {
    it("THEN do not display the component", () => {
      const { container } = render(ProductView);
      expect(container.children).toHaveLength(1);
      expect(
        screen.queryByTestId("product-view-container")
      ).not.toBeInTheDocument();
    });
  });

  describe("WHEN rendered with props", () => {
    it("THEN display products", () => {
      render(ProductView, {
        productArr: mockData,
        variantCategories: [],
      });

      expect(screen.getByText("Elephant")).toBeInTheDocument();
      expect(screen.getByText("Dog")).toBeInTheDocument();
    });

    it("AND the url DOES NOT contain the gift wrap id THEN DO NOT display gift wrap info", () => {
      delete global.window.location;

      global.window.location = {
        ancestorOrigins: null,
        hash: null,
        host: "dummy.com",
        port: "80",
        protocol: "http:",
        hostname: "dummy.com",
        href: "http://dummy.com?page=1&name=testing",
        origin: "http://dummy.com",
        pathname: "/NOT_GIFT_WRAP_ID",
        search: null,
        assign: null,
        reload: null,
        replace: null,
        toString: () => {
          return global.window.location.href;
        },
      };

      render(ProductView, {
        productArr: mockData,
        variantCategories: [],
      });

      const giftImages = screen.queryAllByRole("img");

      expect(giftImages).toHaveLength(0);
      expect(
        screen.queryByText("Select which gifts", { exact: false })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("To make your gift extra special", { exact: false })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("There's also a space", { exact: false })
      ).not.toBeInTheDocument();
    });

    it("AND the url contains the gift wrap id THEN display gift wrap info", () => {
      delete global.window.location;

      global.window.location = {
        ancestorOrigins: null,
        hash: null,
        host: "dummy.com",
        port: "80",
        protocol: "http:",
        hostname: "dummy.com",
        href: "http://dummy.com?page=1&name=testing",
        origin: "http://dummy.com",
        pathname: "/1876089",
        search: null,
        assign: null,
        reload: null,
        replace: null,
        toString: () => {
          return global.window.location.href;
        },
      };

      render(ProductView, {
        productArr: mockData,
        variantCategories: [],
      });

      const giftImages = screen.getAllByRole("img");

      expect(giftImages[0]).toHaveAttribute(
        "src",
        "https://enki.imgix.net/gift-wrap-1.jpeg?format=auto,compress"
      );
      expect(
        screen.getByText("Select which gifts", { exact: false })
      ).toBeInTheDocument();
      expect(giftImages[1]).toHaveAttribute(
        "src",
        "https://enki.imgix.net/gift-wrap-2.jpeg?format=auto,compress"
      );
      expect(
        screen.getByText("To make your gift extra special", { exact: false })
      ).toBeInTheDocument();
      expect(giftImages[2]).toHaveAttribute(
        "src",
        "https://enki.imgix.net/gift-wrap-3.jpeg?format=auto,compress"
      );
      expect(
        screen.getByText("There's also a space", { exact: false })
      ).toBeInTheDocument();
    });

    it.todo("THEN sort the products alphabetically", () => {});
    it.todo("THEN sort the products highest to lowest", () => {});
    it.todo("THEN sort the products lowest to highest", () => {});
    it.todo("THEN sort the products by stock", () => {});
    it.todo(
      "AND the products are already sorted THEN don't sort the products again",
      () => {}
    );
    it.todo("THEN group variant products", () => {});
  });
});
