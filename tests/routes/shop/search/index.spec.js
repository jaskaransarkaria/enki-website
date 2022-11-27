import { expect, test } from "@playwright/test";

test("searches for a product and navigates through to the product", async ({
  page,
}) => {
  await page.goto("/shop/search");

  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

  const search = page.locator("img.search-icon");
  await search.click();
  await page.waitForTimeout(500);
  await page.keyboard.type("sloth");
  await page.keyboard.press("Enter");

  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

  expect(page.url()).toBe(
    "http://localhost:4000/shop/search?search-term=sloth"
  );

  await page.click(".simple-container >> nth=0");
  await page.waitForURL("http://localhost:4000/shop/product/30667807");

  expect(page.url()).toBe("http://localhost:4000/shop/product/30667807");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

  await search.click();
  await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
  expect(page.url()).toBe("http://localhost:4000/shop/search?search-term=");
});
