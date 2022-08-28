import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/svelte";
import CategoryView from "./CategoryView.svelte";

import type { Category } from "$lib/types/category";
import type { Product } from "$lib/types/product";

const nestedCategories = {
  Id: -1,
  ParentId: null,
  Name: "",
  NominalCode: "CATEGORY",
  Children: [
    {
      Id: 123,
      ParentId: null,
      Name: "Clothes",
      NominalCode: "CATEGORY",
      Children: [
        {
          Id: 456,
          ParentId: null,
          Name: "Shoes",
          NominalCode: "CATEGORY",
          Children: [
            {
              Id: 789,
              ParentId: null,
              Name: "Hats",
              NominalCode: "CATEGORY",

              Children: [],
            },
          ],
        },
      ],
    },
  ],
};

const nestedTagCategories = {
  Id: 1875997,
  ParentId: null,
  Name: "ParentTag",
  TagTypeId: "tag",
  NominalCode: "CATEGORY",
  Children: [
    {
      Id: 123,
      ParentId: null,
      Name: "TagClothes",
      NominalCode: "CATEGORY",
      Children: [],
    },
  ],
};

const jewelleryNestedCategories = {
  Id: 1875996,
  ParentId: null,
  Name: "",
  NominalCode: "CATEGORY",
  Children: [
    {
      Id: 111,
      ParentId: null,
      Name: "fine jewellery",
      NominalCode: "CATEGORY",
      Children: [],
    },
    {
      Id: 222,
      ParentId: null,
      Name: "costume jewellery",
      NominalCode: "CATEGORY",
      Children: [],
    },
    {
      Id: 333,
      ParentId: null,
      Name: "jaskaran sarkaria",
      NominalCode: "CATEGORY",
      Children: [],
    },
  ],
};

const variantNestedCategories = {
  Id: -1,
  ParentId: null,
  Name: "",
  NominalCode: "CATEGORY",
  Children: [
    {
      Id: 123,
      ParentId: null,
      Name: "VariantClothes",
      NominalCode: null,
      Children: [],
    },
  ],
};

const dummyProductArr = [
  {
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
  },
] as Product[];

describe("GIVEN CategoryView", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("WHEN rendered with props", () => {
    it("THEN display the correct category", () => {
      render(CategoryView, {
        categoryFn: (cat: Category) => `${cat} fn fired`,
        categoryToShow: nestedCategories,
        productArr: [],
        whitelistedUserAgent: true,
      });

      //breadcrumbs should be mounted
      expect(screen.getByText("Shop")).toBeInTheDocument();
      //
      // the category to display
      expect(screen.getByText("Clothes", { exact: true })).toBeInTheDocument();
      expect(screen.queryByText("Shoes")).not.toBeInTheDocument();
      expect(screen.queryByText("Hats")).not.toBeInTheDocument();
      expect(screen.queryByText("Dummy")).not.toBeInTheDocument();
    });

    it("THEN display a TAG Category", () => {
      render(CategoryView, {
        categoryFn: (cat: Category) => `${cat} fn fired`,
        categoryToShow: nestedTagCategories,
        productArr: [],
        whitelistedUserAgent: true,
      });

      expect(screen.getByText("TagClothes")).toBeInTheDocument();
    });

    it("THEN display a JEWELLERY Category", () => {
      render(CategoryView, {
        categoryFn: (cat: Category) => `${cat} fn fired`,
        categoryToShow: jewelleryNestedCategories,
        productArr: [],
        whitelistedUserAgent: true,
      });

      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by type" })
      ).toBeInTheDocument();
      expect(screen.getByText("fine jewellery")).toBeInTheDocument();
      expect(screen.getByText("costume jewellery")).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by artist" })
      ).toBeInTheDocument();
      expect(screen.getByText("jaskaran sarkaria")).toBeInTheDocument();
    });

    it("AND showBreadcrumbs is false THEN don't show breadcrumbs", () => {
      render(CategoryView, {
        showBreadcrumbs: false,
      });
      expect(screen.queryByText("Shop")).not.toBeInTheDocument();
    });

    it("AND it is a VARIANT category THEN don't show the category", () => {
      render(CategoryView, {
        categoryFn: (cat: Category) => `${cat} fn fired`,
        categoryToShow: variantNestedCategories,
        productArr: [],
        whitelistedUserAgent: true,
      });

      expect(screen.getByText("VariantClothes")).toBeInTheDocument();
    });
  });

  describe("WHEN there are no categories", () => {
    it("THEN display products", () => {
      render(CategoryView, {
        categoryFn: (cat: Category) => `${cat} fn fired`,
        categoryToShow: {} as Category,
        productArr: dummyProductArr,
        whitelistedUserAgent: true,
      });

      expect(screen.getByText("Dummy")).toBeInTheDocument();
    });
  });
});
