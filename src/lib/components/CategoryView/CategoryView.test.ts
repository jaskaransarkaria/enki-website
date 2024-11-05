import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import CategoryView from "./CategoryView.svelte";
import { reset as resetCategoriesStore } from "$lib/stores/basket";

import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

const nestedCategories = {
  id: "000",
  category_data: {
    name: "Root",
    parent_category: { id: null },
  },
  custom_attribute_values: {
    epos_now_id: { string_value: null },
    epos_now_nominal_code: { string_value: null },
    image_arr: { string_value: "foobar" },
  },
  children: [
    {
      id: "111",
      category_data: {
        name: "Clothes",
        parent_category: { id: null },
      },
      custom_attribute_values: {
        epos_now_id: { string_value: null },
        epos_now_nominal_code: { string_value: null },
        image_arr: { string_value: "foobar" },
      },
      children: [
        {
          id: "456",
          category_data: {
            name: "Adult Clothes",
            parent_category: { id: "111" },
          },
          custom_attribute_values: {
            epos_now_id: { string_value: "" },
            epos_now_nominal_code: { string_value: "" },
            image_arr: { string_value: "blahblah" },
          },
          children: [],
        },
      ],
    },
  ],
};

const dummyProductArr = [
  {
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
] as SquareProduct[];

describe("GIVEN CategoryView", () => {
  afterEach(() => {
    vi.clearAllMocks();
    resetCategoriesStore();
  });

  describe("WHEN rendered with props", () => {
    it("THEN display the correct category", () => {
      render(CategoryView, {
        categoryFn: (cat: SquareCategory) => `${cat} fn fired`,
        categoryToShow: nestedCategories,
        productArr: [],
        whitelistedUserAgent: true,
      });

      //breadcrumbs should be mounted
      expect(screen.getByText("Shop")).toBeInTheDocument();

      // the category to display
      expect(screen.getByText("Clothes", { exact: true })).toBeInTheDocument();
      expect(screen.queryByText("Shoes")).not.toBeInTheDocument();
      expect(screen.queryByText("Hats")).not.toBeInTheDocument();
      expect(screen.queryByText("Dummy")).not.toBeInTheDocument();
    });

    it("AND showBreadcrumbs is false THEN don't show breadcrumbs", () => {
      render(CategoryView, {
        showBreadcrumbs: false,
      });
      expect(screen.queryByText("Shop")).not.toBeInTheDocument();
    });
  });

  describe("WHEN there are no categories", () => {
    it("THEN display products", () => {
      render(CategoryView, {
        categoryFn: (cat: SquareCategory) => `${cat} fn fired`,
        categoryToShow: {} as SquareCategory,
        productArr: dummyProductArr,
        whitelistedUserAgent: true,
      });

      expect(screen.getByText("Elephant")).toBeInTheDocument();
    });
  });
});
