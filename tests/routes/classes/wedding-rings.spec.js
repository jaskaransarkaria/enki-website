import { expect, test } from "@playwright/test";

test("Classes Wedding Ring Page", async ({ page }) => {
  await page.goto("/classes/wedding-rings");
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.25 });
});
