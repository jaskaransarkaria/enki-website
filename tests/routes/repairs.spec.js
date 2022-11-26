import { expect, test } from "@playwright/test";

test.describe("Mobile Repairs Page", () => {
  test.use({ viewport: { width: 350, height: 900 } });
  test("Repairs page", async ({ page }) => {
    await page.goto("/repairs");

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.3 });
  });
});

test.describe("Desktop Repairs Page", () => {
  test.use({ viewport: { width: 1280, height: 2400 } });
  test("Repairs page", async ({ page }) => {
    await page.goto("/repairs");

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
  });
});
