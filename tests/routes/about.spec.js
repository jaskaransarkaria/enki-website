import { expect, test } from "@playwright/test";

test("About Page", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
});
