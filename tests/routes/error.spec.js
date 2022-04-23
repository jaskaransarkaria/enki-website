import { expect, test } from "@playwright/test";

test("Error Page", async ({ page }) => {
  await page.goto("/errror");
  await expect(page.locator("div > img >> nth=3")).toHaveAttribute(
    "src",
    "404.png"
  );
});
