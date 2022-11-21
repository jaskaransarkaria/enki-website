import { expect, test } from "@playwright/test";

test.describe("/category/*", () => {
  test.use({ viewport: { width: 1961, height: 2400 } });

  test("shows products for that category", async ({ page }) => {
    await page.goto("/shop/category/1876030"); // books -> books for Grownups -> silly books
    await expect(page.locator(".products-container")).toHaveCount(1);
    await expect(page.locator(".simple-container")).toHaveCount(4);
    await expect(page.locator(".simple-prod-name")).toHaveCount(4);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
  });

  test("loads /shop/category/BOOKS_ID", async ({ page }) => {
    // /shop/category/[ books ] -> tests category view
    await page.goto("/shop/category/1876023");
    await expect(page.locator(".flexbox-container")).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test("clicks through to the detailed product view", async ({ page }) => {
    await page.goto("/shop/category/1876030");
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
    // click through to products/
    await page.click(".simple-container >> nth=0");

    await page.waitForURL("http://localhost:4000/shop/product/30667807");
    expect(page.url()).toBe("http://localhost:4000/shop/product/30667807");
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/shop/category/1876030");
  });

  test.skip("loads /shop/category/JEWELLERY_ID", async ({ page }) => {
    // /shop/category/[ jewellery ] -> tests Jewellery view
    await page.goto("/shop/category/1875996");
    await expect(page.locator(".root-categories-container")).toHaveCount(1);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test.skip("loads /shop/category/FINE_JEWELLERY_ID", async ({ page }) => {
    // /shop/category/[ fine-jewellery ] -> tests tag view
    await page.goto("/shop/category/1875997");
    await expect(page.locator(".root-categories-container")).toHaveCount(1);

    await expect(page).toHaveScreenshot();
  });
});
