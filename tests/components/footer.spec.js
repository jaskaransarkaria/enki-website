import { expect, test } from "@playwright/test";

test.describe("Footer", () => {
  test("shows mobile footer", async ({ page }) => {
    await page.setViewportSize({ width: 350, height: 900 });
    await page.goto("/");
    await expect(page.locator(".mobile-footer-icons")).toHaveCount(3);
    await expect(page.locator("h3")).toHaveText(
      "Want to be the first to find out about new products and classes?"
    );
    await expect(page.locator("#mc_embed_signup")).toHaveCount(1);
  });

  test("shows desktop footer", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2400 });
    await page.goto("/");
    await expect(page.locator(".footer-icons")).toHaveCount(3);
    await expect(page.locator("h3")).toHaveText(
      "Want to be the first to find out about new products and classes?"
    );
    await expect(page.locator("#mc_embed_signup")).toHaveCount(1);
    await expect(
      page.locator("[data-testid=supported-card-brands]")
    ).toHaveAttribute(
      "href",
      "https://stripe.com/docs/payments/cards/supported-card-brands"
    );
    await expect(page.locator(".trust-badge")).toHaveAttribute(
      "src",
      "/stripe-badge-white.png"
    );

    await page.locator(".footer-icons >> nth=0").click();
    await page.waitForURL("http://localhost:4000/contact");
    expect(page.url()).toBe("http://localhost:4000/contact");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");
  });
});
