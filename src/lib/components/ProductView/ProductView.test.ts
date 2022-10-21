import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import ProductView from "./ProductView.svelte";

import type { Product } from "$lib/types/product";

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

const mockVariantCategories = [
  {
    Id: 111,
    ParentId: null,
    Name: "Blue",
    NominalCode: "CATEGORY",
    Children: [],
  },
  {
    Id: 222,
    ParentId: null,
    Name: "Green",
    NominalCode: "CATEGORY",
    Children: [],
  },
  {
    Id: 333,
    ParentId: null,
    Name: "Yellow",
    NominalCode: "CATEGORY",
    Children: [],
  },
];

describe("GIVEN ProductView", () => {
  const orignalLocation = global.window.location;

  afterEach(() => {
    global.window.location = orignalLocation;
    global.window.sessionStorage.setItem("filter", null);
    jest.clearAllMocks();
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

    it("THEN sort the products alphabetically", async () => {
      render(ProductView, {
        productArr: mockData,
        variantCategories: [],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(products[0]).toHaveTextContent("Elephant");
      expect(products[1]).toHaveTextContent("90");
      expect(products[2]).toHaveTextContent("Dog");
      expect(products[3]).toHaveTextContent("10");

      expect(
        (screen.getByRole("option", { name: "A - Z" }) as HTMLOptionElement)
          .selected
      ).toBe(false);
      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "alphabetically"
      );
      expect(
        (screen.getByRole("option", { name: "A - Z" }) as HTMLOptionElement)
          .selected
      ).toBe(true);

      const sortedProducts = screen.getAllByRole("heading", { level: 3 });

      expect(sortedProducts[0]).toHaveTextContent("Dog");
      expect(sortedProducts[1]).toHaveTextContent("10");
      expect(sortedProducts[2]).toHaveTextContent("Elephant");
      expect(sortedProducts[3]).toHaveTextContent("90");
    });

    it("THEN sort the products highest to lowest", async () => {
      render(ProductView, {
        productArr: mockData,
        variantCategories: [],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(products[0]).toHaveTextContent("Elephant");
      expect(products[1]).toHaveTextContent("90");
      expect(products[2]).toHaveTextContent("Dog");
      expect(products[3]).toHaveTextContent("10");

      expect(
        (
          screen.getByRole("option", {
            name: "price (high to low)",
          }) as HTMLOptionElement
        ).selected
      ).toBe(false);
      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "price-high-low"
      );
      expect(
        (
          screen.getByRole("option", {
            name: "price (high to low)",
          }) as HTMLOptionElement
        ).selected
      ).toBe(true);

      const sortedProducts = screen.getAllByRole("heading", { level: 3 });

      expect(sortedProducts[0]).toHaveTextContent("Elephant");
      expect(sortedProducts[1]).toHaveTextContent("90");
      expect(sortedProducts[2]).toHaveTextContent("Dog");
      expect(sortedProducts[3]).toHaveTextContent("10");
    });

    it("THEN sort the products lowest to highest", async () => {
      render(ProductView, {
        productArr: mockData,
        variantCategories: [],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(products[0]).toHaveTextContent("Elephant");
      expect(products[1]).toHaveTextContent("90");
      expect(products[2]).toHaveTextContent("Dog");
      expect(products[3]).toHaveTextContent("10");

      expect(
        (
          screen.getByRole("option", {
            name: "price (low to high)",
          }) as HTMLOptionElement
        ).selected
      ).toBe(false);
      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "price-low-high"
      );
      expect(
        (
          screen.getByRole("option", {
            name: "price (low to high)",
          }) as HTMLOptionElement
        ).selected
      ).toBe(true);

      const sortedProducts = screen.getAllByRole("heading", { level: 3 });

      expect(sortedProducts[0]).toHaveTextContent("Dog");
      expect(sortedProducts[1]).toHaveTextContent("10");
      expect(sortedProducts[2]).toHaveTextContent("Elephant");
      expect(sortedProducts[3]).toHaveTextContent("90");
    });

    it("THEN sort the products by stock", async () => {
      render(ProductView, {
        productArr: [
          ...mockData,
          {
            Id: 789,
            Name: "Cat",
            CategoryId: 999,
            Description: "small animal",
            SalePrice: 66,
            ProductImages: [],
            ProductTags: [],
            VariantGroupId: null,
            CurrentStock: 999,
            ProductDetails: {
              DetailedDescription: "agile",
            },
            SellOnWeb: true,
            IsArchived: false,
          },
        ],
        variantCategories: [],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(products[0]).toHaveTextContent("Cat");
      expect(products[1]).toHaveTextContent("66");
      expect(products[2]).toHaveTextContent("Elephant");
      expect(products[3]).toHaveTextContent("90");
      expect(products[4]).toHaveTextContent("Dog");
      expect(products[5]).toHaveTextContent("10");

      expect(
        (screen.getByRole("option", { name: "in stock" }) as HTMLOptionElement)
          .selected
      ).toBe(true); // this is the default

      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "price (high to low)"
      );

      expect(
        (screen.getByRole("option", { name: "in stock" }) as HTMLOptionElement)
          .selected
      ).toBe(false);

      await userEvent.selectOptions(screen.getByRole("combobox"), "in stock");

      expect(
        (screen.getByRole("option", { name: "in stock" }) as HTMLOptionElement)
          .selected
      ).toBe(true);

      const sortedProducts = screen.getAllByRole("heading", { level: 3 });

      expect(sortedProducts[0]).toHaveTextContent("Cat");
      expect(sortedProducts[1]).toHaveTextContent("66");
      expect(sortedProducts[2]).toHaveTextContent("Elephant");
      expect(sortedProducts[3]).toHaveTextContent("90");
      expect(sortedProducts[4]).toHaveTextContent("Dog");
      expect(sortedProducts[5]).toHaveTextContent("10");
    });

    it("AND the products are already sorted THEN don't sort the products again", async () => {
      render(ProductView, {
        sorted: true,
        productArr: [
          ...mockData,
          {
            Id: 789,
            Name: "Cat",
            CategoryId: 999,
            Description: "small animal",
            SalePrice: 66,
            ProductImages: [],
            ProductTags: [],
            VariantGroupId: null,
            CurrentStock: 999,
            ProductDetails: {
              DetailedDescription: "agile",
            },
            SellOnWeb: true,
            IsArchived: false,
          },
          {
            Id: 790,
            Name: "Fish",
            CategoryId: 999,
            Description: "scaley",
            SalePrice: 99,
            ProductImages: [],
            ProductTags: [],
            VariantGroupId: null,
            CurrentStock: 1000,
            ProductDetails: {
              DetailedDescription: "lives in water",
            },
            SellOnWeb: true,
            IsArchived: false,
          },
        ],
        variantCategories: [],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(
        (screen.getByRole("option", { name: "relevant" }) as HTMLOptionElement)
          .selected
      ).toBe(true);

      expect(products[0]).toHaveTextContent("Elephant");
      expect(products[1]).toHaveTextContent("90");
      expect(products[2]).toHaveTextContent("Dog");
      expect(products[3]).toHaveTextContent("10");
      expect(products[4]).toHaveTextContent("Cat");
      expect(products[5]).toHaveTextContent("66");
      expect(products[6]).toHaveTextContent("Fish");
      expect(products[7]).toHaveTextContent("99");
    });

    it("THEN group variant products and display them as individual products along side other products", () => {
      render(ProductView, {
        productArr: mockData,
        variantCategories: mockVariantCategories,
      });

      expect(screen.getByText("Elephant")).toBeInTheDocument();
      expect(screen.getByText("Dog")).toBeInTheDocument();
      expect(screen.getByText("Green")).toBeInTheDocument();
      expect(screen.getByText("Blue")).toBeInTheDocument();
      expect(screen.getByText("Yellow")).toBeInTheDocument();
    });
  });
});
