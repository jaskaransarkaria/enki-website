import { expect, test } from "@playwright/test";

test("Error Page", async ({ page }) => {
  await page.goto("/errror");
  await expect(page.locator("h1")).toHaveText("404");
});
