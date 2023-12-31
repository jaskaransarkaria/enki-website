import { expect, test } from "@playwright/test";

test.describe("Mobile Home Page", () => {
  // Run tests in this describe block with portrait-like viewport.
  test.use({ viewport: { width: 350, height: 900 } });

  test("loads mobile with correct assets", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("figure")).toHaveClass(/mobile-container/);
    await expect(page.locator("img.parallax-inside-shop")).toHaveClass(
      /parallax-inside-shop/
    );
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.15 });
  });
});

test.describe("Desktop Home Page", () => {
  // Run tests in this describe block with portrait-like viewport.
  test.use({ viewport: { width: 1280, height: 2400 } });

  test("loads desktop and can navigate through animated svgs", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.15 });
    await page.locator("data-test-id=repairs").click();
    await page.waitForURL("http://localhost:4000/repairs");
    expect(page.url()).toBe("http://localhost:4000/repairs");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("data-test-id=classes").click();
    await page.waitForURL("http://localhost:4000/classes");
    expect(page.url()).toBe("http://localhost:4000/classes");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("data-test-id=online-shop").click();
    await page.waitForURL("http://localhost:4000/shop");
    expect(page.url()).toBe("http://localhost:4000/shop");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("data-test-id=guide").click();
    await page.waitForURL("http://localhost:4000/gift-guide");
    expect(page.url()).toBe("http://localhost:4000/gift-guide");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");
  });
});
