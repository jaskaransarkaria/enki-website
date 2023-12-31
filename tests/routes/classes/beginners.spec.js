import { expect, test } from "@playwright/test";

test("Classes Beginners Page", async ({ page }) => {
  await page.goto("/classes/beginners");

  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.3 });

  await page.locator(".container > p > a >> nth=0").click();
  await page.waitForURL("http://localhost:4000/contact");
  await page.goBack();
  await page.waitForURL("http://localhost:4000/classes/beginners");

  await expect(page.locator(".tt-widget")).toHaveCount(1);
});
