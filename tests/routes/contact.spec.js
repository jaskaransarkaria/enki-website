import { expect, test } from "@playwright/test";

test("Contact Page", async ({ page }) => {
  await page.goto("/contact");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
});
