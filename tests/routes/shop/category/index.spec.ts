import { expect, test } from "@playwright/test";

test.describe("/category/*", () => {
  test.use({ viewport: { width: 1280, height: 2400 } });

test("loads /shop/category/BOOKS_ID", async ({ page }) => {
  // /shop/category/[ books ] -> tests category view
  // TODO: test Breadcrumbs here
  await page.goto("/shop/category/1876023")
  await expect(page.locator(".root-categories-container")).toHaveCount(1)

  await expect(page.locator("[data-testid=hex-image-fallback]")).toHaveCount(3)
  
  await expect(page.locator("div > h3 >> nth=0")).toHaveText("Bookmarks")
  await expect(page.locator("[data-testid=cdn-img] >> nth=0")).toHaveAttribute("srcset", "https://enki.imgix.net/faith.jpg?auto=format,compress")

  await expect(page.locator("div > h3 >> nth=1")).toHaveText("Books For Grownups")
  await expect(page.locator("[data-testid=cdn-img] >> nth=1")).toHaveAttribute("srcset", "https://enki.imgix.net/faith.jpg?auto=format,compress")

  await expect(page.locator("div > h3 >> nth=2")).toHaveText("Books for Kids")
  await expect(page.locator("[data-testid=cdn-img] >> nth=2")).toHaveAttribute("srcset", "https://enki.imgix.net/faith.jpg?auto=format,compress")
})

test("shows products for that category", async ({ page }) => {
  await page.goto("/shop/category/1876030")
  await expect(page.locator(".products-container")).toHaveCount(1)
  await expect(page.locator(".simple-container")).toHaveCount(8)
  await expect(page.locator(".simple-prod-name")).toHaveCount(8)
  await expect(page.locator("img >> nth=4")).toHaveAttribute("src", "https://enki.imgix.net/30667807-0?auto=format,compress")
  await expect(page.locator(".simple-prod-name >> nth=0")).toHaveText("A Sloths Guide to Mindfulness")
  await expect(page.locator("[data-testid=sale-price] >> nth=0")).toHaveText("£11.99")

  await expect(page.locator("img >> nth=5")).toHaveAttribute("src", "https://enki.imgix.net/30667811-0?auto=format,compress")
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText("Cosmic Care")
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText("£10.99")

  await expect(page.locator("img >> nth=6")).toHaveAttribute("src", "https://enki.imgix.net/30667812-0?auto=format,compress")
  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText("Drinking Games Book")
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText("£5.99")

  await page.click(".switch > span", { force: true })

  await expect(page.locator("img >> nth=4")).toHaveAttribute("src", "https://enki.imgix.net/30667807-0?auto=format,compress")
  await expect(page.locator(".simple-prod-name >> nth=0")).toHaveText("A Sloths Guide to Mindfulness")
  await expect(page.locator("[data-testid=sale-price] >> nth=0")).toHaveText("£11.99")

  await expect(page.locator("img >> nth=5")).toHaveAttribute("src", "https://enki.imgix.net/30667811-0?auto=format,compress")
  await expect(page.locator(".simple-prod-name >> nth=1")).toHaveText("Dumb Birds of the Whole World")
  await expect(page.locator("[data-testid=sale-price] >> nth=1")).toHaveText("£11.99")

  await expect(page.locator("img >> nth=6")).toHaveAttribute("src", "https://enki.imgix.net/30668257-0?auto=format,compress")
  await expect(page.locator(".simple-prod-name >> nth=2")).toHaveText("Cosmic Care")
  await expect(page.locator("[data-testid=sale-price] >> nth=2")).toHaveText("£10.99")
  // TODO: check click through to products/

})

test.skip("shows variant products for that category", () => {})


test("loads /shop/category/JEWELLERY_ID", async ({ page }) => {
  // /shop/category/[ jewellery ] -> tests Jewellery view
  await page.goto("/shop/category/1875996")
  expect(await page.textContent("h1 >> nth=0")).toBe("Shop by type");
  await expect(page.locator(".root-categories-container")).toHaveCount(1)

  await expect(page.locator("[data-testid=hex-image-fallback]")).toHaveCount(14)
  
  await expect(page.locator("div > h3 >> nth=0")).toHaveText("Fine Jewellery")

  await expect(page.locator("div > h3 >> nth=1")).toHaveText("Costume Jewellery")
  expect(await page.textContent("h1 >> nth=1")).toBe("Shop by artist");

  await expect(page.locator("div > h3 >> nth=2")).toHaveText("Fen & Co Jewellery")
})

test.skip("loads /shop/category/FINE_JEWELLERY_ID", async ({ page }) => {
  // TODO: come back here when working on the tags
  // /shop/category/[ fine-jewellery ] -> tests tag view
  await page.goto("/shop/category/1875997")
  await expect(page.locator(".root-categories-container")).toHaveCount(1)

  await expect(page.locator("[data-testid=hex-image-fallback]")).toHaveCount(14)
  
  await expect(page.locator("div > h3 >> nth=0")).toHaveText("Fine Jewellery")

  await expect(page.locator("div > h3 >> nth=1")).toHaveText("Costume Jewellery")
  expect(await page.textContent("h1 >> nth=1")).toBe("Shop by artist");

  await expect(page.locator("div > h3 >> nth=2")).toHaveText("Fen & Co Jewellery")
})
})
