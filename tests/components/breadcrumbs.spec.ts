import { expect, test } from "@playwright/test";

test.describe("Breadcrumbs", () => {
  test.use({ viewport: { width: 1280, height: 2400 } });

  test("show breadcrumbs for category", async ({ page }) => {
    await page.goto("/shop/category/1876023")

    await expect(page.locator("[data-testid=breadcrumb] >> nth=0")).toHaveText("Shop")
    await expect(page.locator("[data-testid=breadcrumb] >> nth=1")).toHaveText("Books")

    await page.click("[data-testid=breadcrumb] >> nth=0")

    await page.waitForURL("http://localhost:4000/shop")
    expect(page.url()).toBe("http://localhost:4000/shop")
    await page.goBack()
    expect(page.url()).toBe("http://localhost:4000/shop/category/1876023")

    await page.click("[data-testid=breadcrumb] >> nth=1")

    await page.waitForURL("http://localhost:4000/shop/category/1876023")
    expect(page.url()).toBe("http://localhost:4000/shop/category/1876023")

  })
})
