import { expect, test } from "@playwright/test";

test("About Page", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(".shop-pics > img >> nth=0")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/left_enki.jpg?auto=format,compress&q=1"
  );
  await expect(page.locator(".shop-pics > img >> nth=1")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/about_shop_1.jpg?auto=format,compress&q=1"
  );
  await expect(page.locator(".shop-pics > img >> nth=2")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/right_enki.png?auto=format,compress&q=1"
  );
  expect(await page.textContent("h2")).toBe("Meet the team");
  await expect(page.locator(".card > img >> nth=0")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/faith_1.png?auto=format,compress"
  );
  await expect(page.locator(".card > img >> nth=1")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/dora_1.png?auto=format,compress"
  );
});
