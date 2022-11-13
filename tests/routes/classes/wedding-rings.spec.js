import { expect, test } from "@playwright/test";

test("Classes Wedding Ring Page", async ({ page }) => {
  await page.goto("/classes/wedding-rings");
  await expect(page).toHaveScreenshot();
});
