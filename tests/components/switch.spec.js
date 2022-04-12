import { expect, test } from "@playwright/test";

test("toggles the show products filter", async ({ page }) => {
  await page.goto("/shop/category/1876030");
  await expect(page.locator("img >> nth=4")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/30667807-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=0")).toHaveText(
    "A Sloths Guide to Mindfulness"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=0")).toHaveText(
    "£11.99"
  );

  await expect(page.locator("img >> nth=5")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/30667812-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText(
    "F*ck You Pocket Translator"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText(
    "£6.99"
  );

  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText(
    "Love Sucks, the Truth About Romance"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText(
    "£9.99"
  );

  await page.click(".switch > span", { force: true }); // filters by highest price default is alphabetically

  await expect(page.locator("img >> nth=4")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/30667807-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=0")).toHaveText(
    "A Sloths Guide to Mindfulness"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=0")).toHaveText(
    "£11.99"
  );

  await expect(page.locator("img >> nth=5")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/30668257-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText(
    "Men to Avoid in Art and Life"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText(
    "£10.99"
  );

  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText(
    "Love Sucks, the Truth About Romance"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText(
    "£9.99"
  );

  await page.click(".switch > span", { force: true }); // filters by highest price default is alphabetically

  await expect(page.locator("img >> nth=4")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/30667807-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=0")).toHaveText(
    "A Sloths Guide to Mindfulness"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=0")).toHaveText(
    "£11.99"
  );

  await expect(page.locator("img >> nth=5")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/30667812-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText(
    "F*ck You Pocket Translator"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText(
    "£6.99"
  );

  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText(
    "Love Sucks, the Truth About Romance"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText(
    "£9.99"
  );
});
