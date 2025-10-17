import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import SingleProduct from "./SingleProduct.svelte";

describe("Given SingleProduct", () => {
  describe("WHEN rendered without props", () => {
    it("THEN show no product or product related actions", () => {
      const { container } = render(SingleProduct);
      expect(container.children).toHaveLength(0);
    });
  });
  describe("WHEN rendered with props", () => {
    it("THEN show the product", () => {
      render(SingleProduct, {
        product: {
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
                    amount: 90,
                  },
                  quantity: "9",
                },
              },
            ],
          },
        },
      });
      expect(
        screen.getByRole("heading", { name: /elephant/i }),
      ).toHaveTextContent("Elephant");
    });

    it("THEN show the detailed product (with thumbnails)", () => {
      render(SingleProduct, {
        showDetailedView: true,
        product: {
          id: "123",
          updated_at: "",
          custom_attribute_values: {},
          item_data: {
            name: "Elephant",
            product_type: "",
            categories: [{ id: "999" }],
            is_archived: false,
            ecom_visibility: "VISIBLE",
            description_html: "<h4>big animal</h4>",
            variations: [
              {
                id: "456",
                custom_attribute_values: {
                  image_arr: {
                    string_value: "foobar-0,foobar-1",
                  },
                },
                item_variation_data: {
                  item_id: "123",
                  name: "",
                  price_money: {
                    amount: 200000,
                  },
                  quantity: "9",
                },
              },
            ],
          },
        },
      });

      const multiImages = screen.getAllByTestId("swipe-img");

      expect(
        screen.getByRole("heading", { level: 2, name: "Elephant" }),
      ).toHaveTextContent("Elephant");
      expect(
        screen.getByRole("heading", { level: 4, name: /big/i }),
      ).toHaveTextContent("big animal");
      expect(
        screen.getByRole("heading", { level: 4, name: /2000/i }),
      ).toHaveTextContent("£2000.00");
      expect(multiImages).toHaveLength(2);
      expect(multiImages[0]).toHaveAttribute(
        "src",
        "https://storage.googleapis.com/enki-website/foobar-0",
      );
      expect(multiImages[1]).toHaveAttribute(
        "src",
        "https://storage.googleapis.com/enki-website/foobar-1",
      );
      expect(
        screen.getByRole("button", { name: "Add to Basket" }),
      ).toBeInTheDocument();
    });

    it("THEN show no image", async () => {
      render(SingleProduct, {
        showDetailedView: true,
        product: {
          id: "123",
          updated_at: "",
          custom_attribute_values: {},
          item_data: {
            name: "Green jacket",
            product_type: "",
            categories: [{ id: "999" }],
            is_archived: false,
            ecom_visibility: "VISIBLE",
            description_html: "<h4>greeny</h4>",
            variations: [
              {
                id: "456",
                custom_attribute_values: {
                  image_arr: {
                    string_value: "",
                  },
                },
                item_variation_data: {
                  item_id: "123",
                  name: "",
                  price_money: {
                    amount: 300000,
                  },
                  quantity: "9",
                },
              },
            ],
          },
        },
      });
      expect(
        screen.getByRole("heading", { level: 2, name: "Green jacket" }),
      ).toHaveTextContent("Green jacket");
      expect(
        screen.getByRole("heading", { level: 4, name: /greeny/i }),
      ).toHaveTextContent("greeny");
      expect(
        screen.getByRole("heading", { level: 4, name: /3000/i }),
      ).toHaveTextContent("£3000");
      expect(screen.queryAllByAltText(/789/i)).toHaveLength(0);
      expect(
        screen.getByRole("button", { name: "Add to Basket" }),
      ).toBeInTheDocument();
    });

    it("AND the product is low in stock THEN show the low in stock badge", () => {
      render(SingleProduct, {
        product: {
          id: "123",
          updated_at: "",
          custom_attribute_values: {},
          item_data: {
            name: "Green jacket",
            product_type: "",
            categories: [{ id: "999" }],
            is_archived: false,
            ecom_visibility: "VISIBLE",
            description_html: "<h4>greeny</h4>",
            variations: [
              {
                id: "456",
                custom_attribute_values: {
                  image_arr: {
                    string_value: "",
                  },
                },
                item_variation_data: {
                  item_id: "123",
                  name: "",
                  price_money: {
                    amount: 300000,
                  },
                  quantity: "1",
                },
              },
            ],
          },
        },
      });

      expect(screen.queryByAltText(/low in stock/)).toBeInTheDocument();
      expect(screen.queryByAltText(/out/i)).not.toBeInTheDocument();
    });

    it("AND the product is out of stock THEN show the out in stock badge", () => {
      render(SingleProduct, {
        product: {
          id: "123",
          updated_at: "",
          custom_attribute_values: {},
          item_data: {
            name: "Green jacket",
            product_type: "",
            categories: [{ id: "999" }],
            is_archived: false,
            ecom_visibility: "VISIBLE",
            description_html: "<h4>greeny</h4>",
            variations: [
              {
                id: "456",
                custom_attribute_values: {
                  image_arr: {
                    string_value: "",
                  },
                },
                item_variation_data: {
                  item_id: "123",
                  name: "",
                  price_money: {
                    amount: 300000,
                  },
                  quantity: "0",
                },
              },
            ],
          },
        },
      });

      expect(screen.getByAltText(/out of stock/)).toBeInTheDocument();
      expect(screen.queryByAltText(/low in stock/)).not.toBeInTheDocument();
    });
  });
});
