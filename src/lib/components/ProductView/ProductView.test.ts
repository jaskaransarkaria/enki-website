import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import ProductView from "./ProductView.svelte";

import type { SquareProduct } from "$lib/types/product";

const mockData: readonly SquareProduct[] = [
  {
    id: "123",
    updated_at: "",
    created_at: "2024-11-12T10:49:06.237Z",
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
              amount: 90,
            },
            quantity: "9",
          },
        },
      ],
    },
  },
  {
    id: "789",
    updated_at: "",
    created_at: "2024-11-13T10:49:06.237Z",
    custom_attribute_values: {},
    item_data: {
      name: "Dog",
      product_type: "",
      categories: [{ id: "999" }],
      is_archived: false,
      ecom_visibility: "VISIBLE",
      description_html: "cute animal",
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
              amount: 10,
            },
            quantity: "5",
          },
        },
      ],
    },
  },
] as SquareProduct[];

describe("GIVEN ProductView", () => {
  const originalLocation = global.window.location;

  afterEach(() => {
    global.window.location = originalLocation;
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
        pathname: "/32TE2EITCQ6KE4HQ34ORK6V5",
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
      });

      const giftImages = screen.getAllByTestId("gift-imgs");

      expect(giftImages[0]).toHaveAttribute(
        "src",
        "/src/lib/assets/gift-wrap-1.avif"
      );
      expect(
        screen.getByText("Select which gifts", { exact: false })
      ).toBeInTheDocument();
      expect(giftImages[1]).toHaveAttribute(
        "src",
        "/src/lib/assets/gift-wrap-2.avif"
      );
      expect(
        screen.getByText("To make your gift extra special", { exact: false })
      ).toBeInTheDocument();
      expect(giftImages[2]).toHaveAttribute(
        "src",
        "/src/lib/assets/gift-wrap-3.avif"
      );
      expect(
        screen.getByText("There's also a space", { exact: false })
      ).toBeInTheDocument();
    });

    it("THEN sort the products alphabetically", async () => {
      render(ProductView, {
        productArr: mockData,
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
            id: "888",
            updated_at: "",
            created_at: "2024-11-15T10:49:06.237Z",
            custom_attribute_values: {},
            item_data: {
              name: "Cat",
              product_type: "",
              categories: [{ id: "999" }],
              is_archived: false,
              ecom_visibility: "VISIBLE",
              description_html: "big animal",
              variations: [
                {
                  id: "7777",
                  custom_attribute_values: {
                    image_arr: {
                      string_value: "foobar-0-9sjs9s",
                    },
                  },
                  item_variation_data: {
                    item_id: "888",
                    name: "",
                    price_money: {
                      amount: 900,
                    },
                    quantity: "999",
                  },
                },
              ],
            },
          },
        ],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(products[0]).toHaveTextContent("Cat");
      expect(products[1]).toHaveTextContent("9.00");
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
      expect(sortedProducts[1]).toHaveTextContent("9.00");
      expect(sortedProducts[2]).toHaveTextContent("Elephant");
      expect(sortedProducts[3]).toHaveTextContent("90");
      expect(sortedProducts[4]).toHaveTextContent("Dog");
      expect(sortedProducts[5]).toHaveTextContent("10");
    });

    it("THEN sort the products by newest to oldest", async () => {
      render(ProductView, {
        productArr: [
          ...mockData,
          {
            id: "888",
            updated_at: "",
            created_at: "2024-11-15T10:49:06.237Z",
            custom_attribute_values: {},
            item_data: {
              name: "Newest",
              product_type: "",
              categories: [{ id: "999" }],
              is_archived: false,
              ecom_visibility: "VISIBLE",
              description_html: "big animal",
              variations: [
                {
                  id: "7777",
                  custom_attribute_values: {
                    image_arr: {
                      string_value: "foobar-0-9sjs9s",
                    },
                  },
                  item_variation_data: {
                    item_id: "888",
                    name: "",
                    price_money: {
                      amount: 900,
                    },
                    quantity: "9",
                  },
                },
              ],
            },
          },
        ],
      });

      const productsContainer = screen.getByTestId("products-container");

      const products = within(productsContainer).getAllByRole("heading", {
        level: 3,
      });

      expect(products[0]).toHaveTextContent("Elephant");
      expect(products[1]).toHaveTextContent("0.90");
      expect(products[2]).toHaveTextContent("Newest");
      expect(products[3]).toHaveTextContent("9.00");
      expect(products[4]).toHaveTextContent("Dog");
      expect(products[5]).toHaveTextContent("0.10");

      expect(
        (screen.getByRole("option", { name: "in stock" }) as HTMLOptionElement)
          .selected
      ).toBe(true); // this is the default

      await userEvent.selectOptions(screen.getByRole("combobox"), "new");

      expect(
        (screen.getByRole("option", { name: "in stock" }) as HTMLOptionElement)
          .selected
      ).toBe(false);

      await userEvent.selectOptions(screen.getByRole("combobox"), "new");

      expect(
        (screen.getByRole("option", { name: "new" }) as HTMLOptionElement)
          .selected
      ).toBe(true);

      const sortedProducts = screen.getAllByRole("heading", { level: 3 });

      expect(sortedProducts[0]).toHaveTextContent("Newest");
      expect(sortedProducts[1]).toHaveTextContent("9.00");
      expect(sortedProducts[2]).toHaveTextContent("Dog");
      expect(sortedProducts[3]).toHaveTextContent("0.10");
      expect(sortedProducts[4]).toHaveTextContent("Elephant");
      expect(sortedProducts[5]).toHaveTextContent("0.90");
    });

    it.skip("AND the products are already sorted THEN don't sort the products again", async () => {
      render(ProductView, {
        sorted: true,
        productArr: [
          ...mockData,
          {
            id: "888",
            updated_at: "",
            created_at: "2024-11-15T10:49:06.237Z",
            custom_attribute_values: {},
            item_data: {
              name: "Cat",
              product_type: "",
              categories: [{ id: "999" }],
              is_archived: false,
              ecom_visibility: "VISIBLE",
              description_html: "big animal",
              variations: [
                {
                  id: "7777",
                  custom_attribute_values: {
                    image_arr: {
                      string_value: "foobar-0-9sjs9s",
                    },
                  },
                  item_variation_data: {
                    item_id: "888",
                    name: "",
                    price_money: {
                      amount: 900,
                    },
                    quantity: "999",
                  },
                },
              ],
            },
          },
          {
            id: "889",
            updated_at: "",
            created_at: "2024-11-15T10:49:06.237Z",
            custom_attribute_values: {},
            item_data: {
              name: "Fish",
              product_type: "",
              categories: [{ id: "999" }],
              is_archived: false,
              ecom_visibility: "VISIBLE",
              description_html: "big animal",
              variations: [
                {
                  id: "7777",
                  custom_attribute_values: {
                    image_arr: {
                      string_value: "foobar-0-9sjs9s",
                    },
                  },
                  item_variation_data: {
                    item_id: "888",
                    name: "",
                    price_money: {
                      amount: 9900,
                    },
                    quantity: "1000",
                  },
                },
              ],
            },
          },
        ],
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
  });
});
