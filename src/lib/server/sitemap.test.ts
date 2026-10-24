import { describe, it, expect } from "vitest";
import {
  buildSitemapXml,
  collectEntries,
  isIndexableProduct,
  SITE_URL,
  STATIC_ROUTES,
  toLastmod,
} from "./sitemap";
import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

const makeProduct = (
  id: string,
  categoryIds: string[],
  overrides: Partial<SquareProduct["item_data"]> = {},
  updatedAt = "2026-10-09T13:22:01.926Z",
): SquareProduct =>
  ({
    id,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: updatedAt,
    custom_attribute_values: {},
    item_data: {
      name: `Product ${id}`,
      description_html: "<p>desc</p>",
      is_archived: false,
      ecom_visibility: "VISIBLE",
      product_type: "ITEM",
      variations: [],
      categories: categoryIds.map((categoryId, ordinal) => ({
        id: categoryId,
        ordinal,
      })),
      ...overrides,
    },
  }) as unknown as SquareProduct;

const makeCategory = (
  id: string,
  children: SquareCategory[] = [],
): SquareCategory =>
  ({
    id,
    type: "CATEGORY",
    children,
    category_data: {
      name: `Category ${id}`,
      parent_category: { id: "", ordinal: 0 },
      is_top_level: false,
      root_category: "",
      path_to_root: [],
    },
    custom_attribute_values: {},
  }) as unknown as SquareCategory;

describe("GIVEN sitemap.ts", () => {
  describe("GIVEN toLastmod()", () => {
    it("WHEN given an ISO timestamp THEN returns YYYY-MM-DD", () => {
      expect(toLastmod("2026-10-09T13:22:01.926Z")).toBe("2026-10-09");
    });

    it("WHEN given an invalid or missing value THEN returns undefined", () => {
      expect(toLastmod("not-a-date")).toBeUndefined();
      expect(toLastmod(undefined)).toBeUndefined();
    });
  });

  describe("GIVEN isIndexableProduct()", () => {
    it("WHEN the product is visible and not archived THEN returns true", () => {
      expect(isIndexableProduct(makeProduct("a", ["1"]))).toBe(true);
    });

    it("WHEN the product is archived THEN returns false", () => {
      expect(
        isIndexableProduct(makeProduct("a", ["1"], { is_archived: true })),
      ).toBe(false);
    });

    it("WHEN the product is not visible THEN returns false", () => {
      expect(
        isIndexableProduct(
          makeProduct("a", ["1"], { ecom_visibility: "HIDDEN" }),
        ),
      ).toBe(false);
    });
  });

  describe("GIVEN collectEntries()", () => {
    it("WHEN building entries THEN includes all static routes", () => {
      const entries = collectEntries([], []);
      const locs = entries.map((entry) => entry.loc);

      for (const route of STATIC_ROUTES) {
        expect(locs).toContain(route);
      }
    });

    it("WHEN building entries THEN excludes archived and hidden products", () => {
      const entries = collectEntries(
        [
          makeProduct("visible", ["1"]),
          makeProduct("archived", ["1"], { is_archived: true }),
          makeProduct("hidden", ["1"], { ecom_visibility: "HIDDEN" }),
        ],
        [],
      );

      const locs = entries.map((entry) => entry.loc);
      expect(locs).toContain("/shop/product/visible");
      expect(locs).not.toContain("/shop/product/archived");
      expect(locs).not.toContain("/shop/product/hidden");
    });

    it("WHEN a category subtree contains a product THEN includes the ancestors", () => {
      const entries = collectEntries(
        [makeProduct("p", ["leaf"])],
        [
          makeCategory("root", [
            makeCategory("parent", [makeCategory("leaf")]),
          ]),
        ],
      );

      const locs = entries.map((entry) => entry.loc);
      expect(locs).toContain("/shop/category/root");
      expect(locs).toContain("/shop/category/parent");
      expect(locs).toContain("/shop/category/leaf");
    });

    it("WHEN a category has no products in its subtree THEN excludes it", () => {
      const entries = collectEntries(
        [makeProduct("p", ["with-product"])],
        [makeCategory("with-product"), makeCategory("empty")],
      );

      const locs = entries.map((entry) => entry.loc);
      expect(locs).toContain("/shop/category/with-product");
      expect(locs).not.toContain("/shop/category/empty");
    });

    it("WHEN products have timestamps THEN lastmod is YYYY-MM-DD", () => {
      const entries = collectEntries([makeProduct("p", ["1"])], []);
      const productEntry = entries.find(
        (entry) => entry.loc === "/shop/product/p",
      );

      expect(productEntry?.lastmod).toBe("2026-10-09");
    });

    it("WHEN collecting THEN entries are sorted by loc", () => {
      const entries = collectEntries(
        [makeProduct("b", ["1"]), makeProduct("a", ["1"])],
        [],
      );
      const locs = entries.map((entry) => entry.loc);
      const sorted = [...locs].sort((a, b) => a.localeCompare(b));

      expect(locs).toStrictEqual(sorted);
    });
  });

  describe("GIVEN buildSitemapXml()", () => {
    const xml = buildSitemapXml(
      [makeProduct("product-1", ["cat-1"])],
      [makeCategory("cat-1")],
    );

    it("WHEN building the xml THEN it is a valid urlset document", () => {
      expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
        true,
      );
      expect(xml).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      );
      expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
    });

    it("WHEN building the xml THEN it uses absolute URLs", () => {
      expect(xml).toContain(`<loc>${SITE_URL}/shop/product/product-1</loc>`);
      expect(xml).toContain(`<loc>${SITE_URL}/shop/category/cat-1</loc>`);
    });

    it("WHEN building the xml THEN priority and changefreq are omitted", () => {
      expect(xml).not.toContain("<priority>");
      expect(xml).not.toContain("<changefreq>");
    });

    it("WHEN building the xml THEN every lastmod matches YYYY-MM-DD", () => {
      const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
        (match) => match[1],
      );

      expect(lastmods.length).toBeGreaterThan(0);
      for (const lastmod of lastmods) {
        expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });
});
