import { expect, test } from "@playwright/test";

test("Classes Index Page", async ({ page }) => {
  await page.goto("/classes");
  await expect(page).toHaveScreenshot();

  await page.locator("data-test-id=group-class").click();
  await page.waitForURL("http://localhost:4000/classes/beginners");
  await page.goBack();
  await page.waitForURL("http://localhost:4000/classes");
  await page.locator("data-test-id=wedding-rings").click();
  await page.waitForURL("http://localhost:4000/classes/wedding-rings");
  await page.goBack();
  await page.waitForURL("http://localhost:4000/classes");
});
