import { expect, test } from "@playwright/test";

test("Error Page", async ({ page }) => {
  await page.goto("/errror");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
});
