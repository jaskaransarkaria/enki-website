import { expect, test } from "@playwright/test";

test("loads /shop", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.locator(".root-categories-container")).toHaveCount(1);

  await expect(page.locator("[data-testid=hex-image-fallback]")).toHaveCount(8);

  await expect(page.locator("div > h3 >> nth=0")).toHaveText("Books");
  await expect(page.locator("[data-testid=cdn-img] >> nth=0")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/1876023?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=1")).toHaveText("Cheetah");
  await expect(page.locator("[data-testid=cdn-img] >> nth=1")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=2")).toHaveText("Crocodile");
  await expect(page.locator("[data-testid=cdn-img] >> nth=2")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=3")).toHaveText("Giraffe");
  await expect(page.locator("[data-testid=cdn-img] >> nth=3")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=4")).toHaveText("Hippopotamus");
  await expect(page.locator("[data-testid=cdn-img] >> nth=4")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=5")).toHaveText("Lion");
  await expect(page.locator("[data-testid=cdn-img] >> nth=5")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=6")).toHaveText("Water Buffalo");
  await expect(page.locator("[data-testid=cdn-img] >> nth=5")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("div > h3 >> nth=7")).toHaveText("Zebra");
  await expect(page.locator("[data-testid=cdn-img] >> nth=7")).toHaveAttribute(
    "srcset",
    "https://enki.imgix.net/faith.jpg?auto=format,compress"
  );

  await expect(page.locator("[data-testid=empty-hex]")).toHaveCount(1);

  const books = await page.$("a.hex-link >> nth=0");
  await books.click();
  await page.waitForURL("http://localhost:4000/shop/category/1876023");
  expect(page.url()).toBe("http://localhost:4000/shop/category/1876023");
  await page.goBack();
  expect(page.url()).toBe("http://localhost:4000/shop");
});
