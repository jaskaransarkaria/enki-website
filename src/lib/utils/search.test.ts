import { searchProducts } from "./search";
import type { SquareProduct } from "$lib/types/product";

const mockData: readonly SquareProduct[] = [
  {
    id: "123",
    updated_at: "",
    custom_attribute_values: {},
    item_data: {
      name: "Blue jacket",
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
    custom_attribute_values: {},
    item_data: {
      name: "Green jacket",
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
  {
    id: "555",
    updated_at: "",
    custom_attribute_values: {},
    item_data: {
      name: "Purple jacket",
      product_type: "",
      categories: [{ id: "999" }],
      is_archived: false,
      ecom_visibility: "VISIBLE",
      description_html: "leathery",
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

describe("GIVEN searchProducts()", () => {
  it("WHEN there is a match on the product name THEN return the matches", () => {
    const searchTerm = new RegExp(/jacket/i);
    expect(searchProducts(searchTerm, mockData)).toStrictEqual(mockData);
  });

  it("WHEN there is a match on product description name THEN return the matches", () => {
    const searchTerm = new RegExp(/leathery/i);
    expect(searchProducts(searchTerm, mockData)).toStrictEqual([mockData[2]]);
  });

  it("WHEN there is a match on product detailed description name THEN return the matches", () => {
    const searchTerm = new RegExp(/green/i);
    expect(searchProducts(searchTerm, mockData)).toStrictEqual([mockData[1]]);
  });

  it("WHEN a product IsArchived THEN don't show it in the matches", () => {
    const searchTerm = new RegExp(/jacket/i);
    const mockIsArchived = {
      id: "555",
      updated_at: "",
      custom_attribute_values: {},
      item_data: {
        name: "multi coloured jacket",
        product_type: "",
        categories: [{ id: "999" }],
        is_archived: true,
        ecom_visibility: "VISIBLE",
        description_html: "leathery",
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
    } as SquareProduct;
    expect(
      searchProducts(searchTerm, [...mockData, mockIsArchived]),
    ).toStrictEqual(mockData);
    expect(
      searchProducts(searchTerm, [...mockData, mockIsArchived]),
    ).not.toContain(mockIsArchived);
  });

  it("WHEN a product not `ecom_visibility: 'VISIBLE'` THEN don't show it in the matches", () => {
    const searchTerm = new RegExp(/jacket/i);
    const mockSellOnWeb = {
      id: "888",
      updated_at: "",
      custom_attribute_values: {},
      item_data: {
        name: "Multi jacket",
        product_type: "",
        categories: [{ id: "999" }],
        is_archived: false,
        ecom_visibility: "HIDDEN",
        description_html: "leathery",
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
    } as SquareProduct;
    expect(
      searchProducts(searchTerm, [...mockData, mockSellOnWeb]),
    ).toStrictEqual(mockData);
    expect(
      searchProducts(searchTerm, [...mockData, mockSellOnWeb]),
    ).not.toContain(mockSellOnWeb);
  });
});
