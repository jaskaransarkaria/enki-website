import { describe, it, expect } from "vitest";
import { PUBLIC_BUCKET_URL } from "$env/static/public";
import { SITE_URL } from "$lib/constants";
import {
  breadcrumbJsonLd,
  categoryTrail,
  jsonLdScript,
  productJsonLd,
} from "./structuredData";
import type { SquareCategory } from "$lib/types/category";
import type { SquareProduct } from "$lib/types/product";

const makeProduct = (): SquareProduct =>
  ({
    id: "prod-1",
    item_data: {
      name: "Tin Candles - Fig Tree - St. Eval",
      description_html: "<p>A lovely fig-scented candle.</p>",
      categories: [{ id: "cat-1", ordinal: 0 }],
      is_archived: false,
      ecom_visibility: "VISIBLE",
      product_type: "ITEM",
      variations: [
        {
          id: "var-1",
          item_variation_data: {
            name: "Regular",
            item_id: "prod-1",
            price_money: { amount: 1250, currency: "GBP" },
            quantity: "4",
            sku: "SKU-1",
            upc: "5010484160393",
          },
          custom_attribute_values: {
            image_arr: { string_value: "hash-a,hash-b" },
          },
        },
      ],
    },
  }) as unknown as SquareProduct;

const makeCategory = (
  id: string,
  name: string,
  parentId: string | undefined,
  children: SquareCategory[] = [],
): SquareCategory =>
  ({
    id,
    children,
    category_data: {
      name,
      parent_category: { id: parentId, ordinal: 0 },
      is_top_level: false,
      root_category: "",
      path_to_root: [],
    },
    custom_attribute_values: {},
  }) as unknown as SquareCategory;

describe("GIVEN structuredData.ts", () => {
  describe("GIVEN jsonLdScript()", () => {
    it("WHEN given data THEN wraps it in a JSON-LD script tag", () => {
      expect(jsonLdScript({ a: 1 })).toBe(
        '<script type="application/ld+json">{"a":1}</script>',
      );
    });

    it("WHEN the data contains < THEN escapes it", () => {
      const script = jsonLdScript({ a: "</script>" });

      // only the wrapper's own closing tag should remain
      expect(script.match(/<\/script>/g)).toHaveLength(1);
      expect(script).toContain("\\u003c/script>");
    });
  });

  describe("GIVEN productJsonLd()", () => {
    const json = productJsonLd(makeProduct());

    it("WHEN building THEN strips the supplier from the name", () => {
      expect(json.name).toBe("Tin Candles - Fig Tree");
    });

    it("WHEN building THEN sets the brand from the supplier", () => {
      expect(json.brand).toStrictEqual({ "@type": "Brand", name: "St. Eval" });
    });

    it("WHEN building THEN includes price, availability, sku and gtin13", () => {
      const offer = json.offers as Record<string, unknown>;
      expect(offer.price).toBe("12.50");
      expect(offer.priceCurrency).toBe("GBP");
      expect(offer.availability).toBe("https://schema.org/InStock");
      expect(offer.sku).toBe("SKU-1");
      expect(offer.gtin13).toBe("5010484160393");
    });

    it("WHEN building THEN lists the product images", () => {
      expect(json.image).toStrictEqual([
        `${PUBLIC_BUCKET_URL}/hash-a`,
        `${PUBLIC_BUCKET_URL}/hash-b`,
      ]);
    });

    it("WHEN the quantity is zero THEN marks it out of stock", () => {
      const product = makeProduct();
      product.item_data.variations[0].item_variation_data.quantity = "0";
      const outOfStock = productJsonLd(product).offers as Record<
        string,
        unknown
      >;
      expect(outOfStock.availability).toBe("https://schema.org/OutOfStock");
    });
  });

  describe("GIVEN categoryTrail()", () => {
    it("WHEN given a nested category THEN returns the root-first trail", () => {
      const tree = [
        makeCategory("root", "Homeware", undefined, [
          makeCategory("mid", "Candles", "root", [
            makeCategory("leaf", "Tins", "mid"),
          ]),
        ]),
      ];

      expect(categoryTrail(tree, "leaf")).toStrictEqual([
        { name: "Homeware", url: `${SITE_URL}/shop/category/root` },
        { name: "Candles", url: `${SITE_URL}/shop/category/mid` },
        { name: "Tins", url: `${SITE_URL}/shop/category/leaf` },
      ]);
    });
  });

  describe("GIVEN breadcrumbJsonLd()", () => {
    it("WHEN given items THEN numbers the list from one", () => {
      const json = breadcrumbJsonLd([
        { name: "Shop", url: `${SITE_URL}/shop` },
        { name: "Candles", url: `${SITE_URL}/shop/category/mid` },
      ]);

      expect(json.itemListElement[0].position).toBe(1);
      expect(json.itemListElement[1].position).toBe(2);
    });
  });
});
