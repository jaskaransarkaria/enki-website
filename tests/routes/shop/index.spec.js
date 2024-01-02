import { expect, test } from "@playwright/test";

test("loads /shop", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.locator(".root-categories-container")).toHaveCount(1);

  await page.waitForTimeout(2500);

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
  await expect(page.locator("[data-testid=empty-hex]")).toHaveCount(1);

  const books = await page.$("a.hex-link >> nth=0");
  await books.click();
  await page.waitForURL(
    "http://localhost:4000/shop/category/1876023?name=Books&imgHash=1876023"
  );
  expect(page.url()).toBe(
    "http://localhost:4000/shop/category/1876023?name=Books&imgHash=1876023"
  );
  await page.goBack();
  expect(page.url()).toBe("http://localhost:4000/shop");
});
