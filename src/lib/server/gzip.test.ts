import { describe, it, expect } from "vitest";
import { gunzipSync } from "node:zlib";
import { acceptsGzip, gzipString } from "./gzip";

describe("GIVEN gzip.ts", () => {
  describe("GIVEN acceptsGzip()", () => {
    it("WHEN the header includes gzip THEN returns true", () => {
      expect(acceptsGzip("gzip, deflate, br")).toBe(true);
      expect(acceptsGzip("GZIP")).toBe(true);
    });

    it("WHEN the header omits gzip THEN returns false", () => {
      expect(acceptsGzip("deflate")).toBe(false);
      expect(acceptsGzip(null)).toBe(false);
    });
  });

  describe("GIVEN gzipString()", () => {
    it("WHEN compressing THEN the original can be recovered", () => {
      const input =
        "<urlset><url><loc>https://enkionline.com/</loc></url></urlset>".repeat(
          500,
        );

      const compressed = gzipString(input);

      expect(compressed.length).toBeLessThan(input.length);
      expect(gunzipSync(compressed).toString("utf8")).toBe(input);
    });
  });
});
