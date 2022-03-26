import { expect, test } from "@playwright/test";

test.describe("Footer", () => {
  test("shows mobile footer", async ({ page }) => {
    await page.setViewportSize({width: 350, height: 900})
    await page.goto("/")
    await expect(page.locator(".telephone")).toHaveCount(0)
    await expect(page.locator("h3")).toHaveText("want to be the first to find out about new products and classes?")
    await expect(page.locator("#mc_embed_signup")).toHaveCount(1)
    await expect(page.locator("a")).toHaveAttribute("href", "https://stripe.com/docs/payments/cards/supported-card-brands")
    await expect(page.locator(".trust-badge")).toHaveAttribute("src", "/stripe-badge-white.png")
  })

  test("shows desktop footer", async ({ page }) => {
    await page.setViewportSize({width: 1280, height: 2400})
    await page.goto("/")
    await expect(page.locator(".telephone")).toHaveCount(1)
    await expect(page.locator("h3")).toHaveText("want to be the first to find out about new products and classes?")
    await expect(page.locator("#mc_embed_signup")).toHaveCount(1)
    await expect(page.locator("a")).toHaveAttribute("href", "https://stripe.com/docs/payments/cards/supported-card-brands")
    await expect(page.locator(".trust-badge")).toHaveAttribute("src", "/stripe-badge-white.png")

    await page.locator(".telephone").click()
    await page.waitForURL("http://localhost:4000/contact")
    expect(page.url()).toBe("http://localhost:4000/contact")
    await page.locator("img.enki-logo").click()
    await page.waitForURL("http://localhost:4000/")
    expect(page.url()).toBe("http://localhost:4000/")
  })
})
