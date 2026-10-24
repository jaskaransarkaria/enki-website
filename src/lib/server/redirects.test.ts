import { describe, it, expect } from "vitest";
import { apexRedirectUrl } from "./redirects";

describe("GIVEN apexRedirectUrl()", () => {
  it("WHEN the host is www THEN returns the apex URL with path and query", () => {
    const result = apexRedirectUrl(
      new URL("https://www.enkionline.com/shop?q=rings"),
    );

    expect(result?.toString()).toBe("https://enkionline.com/shop?q=rings");
  });

  it("WHEN the host is already the apex THEN returns null", () => {
    expect(apexRedirectUrl(new URL("https://enkionline.com/shop"))).toBeNull();
  });

  it("WHEN the host is a non-www subdomain THEN returns null", () => {
    expect(
      apexRedirectUrl(new URL("https://e2e-test.enkionline.com/")),
    ).toBeNull();
  });

  it("WHEN the URL has a port THEN the port is preserved", () => {
    const result = apexRedirectUrl(new URL("http://www.enkionline.com:3000/x"));

    expect(result?.hostname).toBe("enkionline.com");
    expect(result?.port).toBe("3000");
  });
});
