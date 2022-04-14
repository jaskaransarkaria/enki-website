import { expect, test } from "@playwright/test";

test.describe("/category/*", () => {
  test.use({ viewport: { width: 1961, height: 2400 } });

  test("shows products for that category", async ({ page }) => {
    await page.goto("/shop/category/1876030"); // books -> books for Grownups -> silly books
    await expect(page.locator(".products-container")).toHaveCount(1);
    await expect(page.locator(".simple-container")).toHaveCount(4);
    await expect(page.locator(".simple-prod-name")).toHaveCount(4);
  });

  test("loads /shop/category/BOOKS_ID", async ({ page }) => {
    // /shop/category/[ books ] -> tests category view
    await page.goto("/shop/category/1876023");
    await expect(page.locator(".flexbox-container")).toHaveCount(1);

    await expect(page.locator("div > h3 >> nth=0")).toHaveText(
      "Books For Grownups"
    );
    await expect(
      page.locator("[data-testid=cdn-img] >> nth=0")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/2680192?auto=format,compress&q=60&lossless=1&w=0.3"
    );

    await expect(page.locator("div > h3 >> nth=1")).toHaveText("Bookmarks");
    await expect(
      page.locator("[data-testid=cdn-img] >> nth=1")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/2743303?auto=format,compress&q=60&lossless=1&w=0.3"
    );

    await expect(page.locator("div > h3 >> nth=2")).toHaveText(
      "Books for Kids"
    );
    await expect(
      page.locator("[data-testid=cdn-img] >> nth=2")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/2680193?auto=format,compress&q=60&lossless=1&w=0.3"
    );
  });

  test("clicks through to the detailed product view", async ({ page }) => {
    await page.goto("/shop/category/1876030");
    // click through to products/
    await page.click(".simple-container >> nth=0");

    await page.waitForURL("http://localhost:4000/shop/product/30667807");
    expect(page.url()).toBe("http://localhost:4000/shop/product/30667807");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/shop/category/1876030");
  });

  test.skip("shows variant products for that category", () => {});

  test("loads /shop/category/JEWELLERY_ID", async ({ page }) => {
    // /shop/category/[ jewellery ] -> tests Jewellery view
    await page.goto("/shop/category/1875996");
    expect(await page.textContent("h1 >> nth=0")).toBe("Shop by type");
    await expect(page.locator(".root-categories-container")).toHaveCount(1);

    await expect(page.locator("div > h3 >> nth=0")).toHaveText(
      "Fine Jewellery"
    );

    await expect(page.locator("div > h3 >> nth=1")).toHaveText(
      "Costume Jewellery"
    );
    expect(await page.textContent("h1 >> nth=1")).toBe("Shop by artist");

    await expect(page.locator("div > h3 >> nth=2")).toHaveText(
      "Fen & Co Jewellery"
    );
  });

  test.skip("loads /shop/category/FINE_JEWELLERY_ID", async ({ page }) => {
    // TODO: come back here when working on the tags
    // /shop/category/[ fine-jewellery ] -> tests tag view
    await page.goto("/shop/category/1875997");
    await expect(page.locator(".root-categories-container")).toHaveCount(1);

    await expect(page.locator("div > h3 >> nth=0")).toHaveText(
      "Fine Jewellery"
    );

    await expect(page.locator("div > h3 >> nth=1")).toHaveText(
      "Costume Jewellery"
    );
    expect(await page.textContent("h1 >> nth=1")).toBe("Shop by artist");

    await expect(page.locator("div > h3 >> nth=2")).toHaveText(
      "Fen & Co Jewellery"
    );
  });
});
