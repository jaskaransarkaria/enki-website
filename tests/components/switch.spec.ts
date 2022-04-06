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
    "https://enki.imgix.net/30667811-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText(
    "Cosmic Care"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText(
    "£10.99"
  );

  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText(
    "Drinking Games Book"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText(
    "£5.99"
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
    "https://enki.imgix.net/30667811-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText(
    "Dumb Birds of the Whole World"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText(
    "£11.99"
  );

  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText(
    "Cosmic Care"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText(
    "£10.99"
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
    "https://enki.imgix.net/30667811-0?auto=format,compress"
  );
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText(
    "Cosmic Care"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText(
    "£10.99"
  );

  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText(
    "Drinking Games Book"
  );
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText(
    "£5.99"
  );
});
