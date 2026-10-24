import { describe, it, expect } from "vitest";
import { DEFAULT_CACHE_CONTROL, withDefaultCacheHeaders } from "./cacheHeaders";

describe("GIVEN withDefaultCacheHeaders()", () => {
  it("WHEN the response has no Cache-Control THEN it adds the default", () => {
    const response = withDefaultCacheHeaders(new Response("hello"));

    expect(response.headers.get("cache-control")).toBe(DEFAULT_CACHE_CONTROL);
  });

  it("WHEN the response already sets Cache-Control THEN it is left alone", () => {
    const original = new Response("<urlset/>", {
      headers: { "Cache-Control": "public, max-age=3600" },
    });

    const response = withDefaultCacheHeaders(original);

    expect(response.headers.get("cache-control")).toBe("public, max-age=3600");
    expect(response).toBe(original);
  });

  it("WHEN the response is immutable THEN it is preserved", () => {
    const response = withDefaultCacheHeaders(
      new Response("body", {
        headers: {
          "Cache-Control": "public,max-age=31536000,immutable",
        },
      }),
    );

    expect(response.headers.get("cache-control")).toBe(
      "public,max-age=31536000,immutable",
    );
  });
});
