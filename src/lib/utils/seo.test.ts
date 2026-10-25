import { describe, it, expect } from "vitest";
import { productDescription, productTitle, stripSupplierSuffix } from "./seo";

describe("GIVEN seo.ts", () => {
  describe("GIVEN stripSupplierSuffix()", () => {
    it("WHEN the name ends with a supplier THEN removes it", () => {
      expect(
        stripSupplierSuffix("Soy Sauce Hand Warmer - House of Disaster"),
      ).toBe("Soy Sauce Hand Warmer");
      expect(stripSupplierSuffix("Tin Candles - Fig Tree - St. Eval")).toBe(
        "Tin Candles - Fig Tree",
      );
    });

    it("WHEN there is no supplier suffix THEN leaves the name alone", () => {
      expect(stripSupplierSuffix("Racecars Socks")).toBe("Racecars Socks");
    });
  });

  describe("GIVEN productTitle()", () => {
    it("WHEN the product is short THEN appends | Enki", () => {
      expect(productTitle("Racecars Socks - JOYA")).toBe(
        "Racecars Socks | Enki",
      );
    });

    it("WHEN the product is long THEN drops | Enki", () => {
      const long = `${"a".repeat(60)} - Supplier`;
      expect(productTitle(long)).toBe("a".repeat(60));
    });

    it("WHEN there is no name THEN falls back to Enki", () => {
      expect(productTitle("")).toBe("Enki");
      expect(productTitle()).toBe("Enki");
    });
  });

  describe("GIVEN productDescription()", () => {
    it("WHEN given HTML THEN returns the first sentence as plain text", () => {
      expect(
        productDescription(
          "<p>Alpaca Wool is a lovely blend. It is soft and warm.</p>",
        ),
      ).toBe("Alpaca Wool is a lovely blend.");
    });

    it("WHEN the first sentence is long THEN truncates at a word boundary", () => {
      const long = `<p>${"word ".repeat(60)}end.</p>`;
      const result = productDescription(long);

      expect(result.endsWith("…")).toBe(true);
      expect(result.length).toBeLessThanOrEqual(151);
    });

    it("WHEN entities are present THEN decodes them", () => {
      expect(productDescription("<p>Bob&#39;s &amp; Co.</p>")).toBe(
        "Bob's & Co.",
      );
    });
  });
});
