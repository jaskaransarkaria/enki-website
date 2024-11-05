import { createServer } from "http";
import mockserver from "mockserver";
import { vi } from "vitest";
import fetch from "node-fetch";
import { mockCategories } from "../../../tests/mocks/fixtures/categories";
import { mockCategory } from "../../../tests/mocks/fixtures/category";
import { mockProducts } from "../../../tests/mocks/fixtures/products";
import { mockTags } from "../../../tests/mocks/fixtures/tags";
import {
  refreshCategories,
  refreshCategoryFromServer,
  refreshCategoriesFromServer,
  refreshProductsFromServer,
} from "./requests";

describe("GIVEN requests.ts", () => {
  beforeAll(async () => {
    createServer(mockserver("./tests/mocks", true)).listen(8888);

    //@ts-ignore
    global.fetch = fetch;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GIVEN refreshCategories()", () => {
    it("WHEN fetching categories THEN return the categories", async () => {
      const categories = await refreshCategories(
        "http://localhost:8888/categories"
      );
      expect(categories).toStrictEqual(mockCategories);
    });

    it("WHEN there is an error THEN return the default value", async () => {
      const categories = await refreshCategories("http://localhost:8888/error");
      expect(categories).toStrictEqual([]);
    });
  });

  describe("GIVEN refreshCategoriesFromServer()", () => {
    it("WHEN fetching categories THEN return the categories", async () => {
      const categories = await refreshCategoriesFromServer(
        "http://localhost:8888/categories",
        fetch as unknown as () => Promise<Response>
      );
      expect(categories).toStrictEqual(mockCategories);
    });
    it("WHEN there is an error THEN return the default value", async () => {
      const categories = await refreshCategoriesFromServer(
        "http://localhost:8888/error",
        fetch as unknown as () => Promise<Response>
      );
      expect(categories).toStrictEqual([]);
    });
  });

  describe("GIVEN refreshCategoryFromServer()", () => {
    it("WHEN fetching a category THEN return the category", async () => {
      const category = await refreshCategoryFromServer(
        "http://localhost:8888/category?id=1875996",
        fetch as unknown as () => Promise<Response>
      );
      expect(category).toStrictEqual(mockCategory);
    });
    it("WHEN there is an error THEN return the default value", async () => {
      const category = await refreshCategoryFromServer(
        "http://localhost:8888/error",
        fetch as unknown as () => Promise<Response>
      );
      expect(category).toStrictEqual([]);
    });
  });

  describe("GIVEN refreshProductsFromServer()", () => {
    it("WHEN fetching products THEN return the products", async () => {
      const products = await refreshProductsFromServer(
        "http://localhost:8888/products-by-category?id=1876030",
        fetch as unknown as () => Promise<Response>
      );
      expect(products).toStrictEqual(mockProducts);
    });
    it("WHEN there is an error THEN return the default value", async () => {
      const products = await refreshProductsFromServer(
        "http://localhost:8888/error",
        fetch as unknown as () => Promise<Response>
      );
      expect(products).toStrictEqual([]);
    });
  });
});
