import { expect, test } from "@playwright/test";

test("adds a product to the basket and navigates through to the checkout", async ({
  page,
}) => {
  await page.goto("/shop/category/1876030");

  await page.waitForTimeout(2500);

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

  const book = await page.$("a.simple-container >> nth=0");
  await book.click();
  await page.waitForURL("http://localhost:4000/shop/product/30667807");
  expect(page.url()).toBe("http://localhost:4000/shop/product/30667807");

  const addToBasket = await page.$("button.add-to-basket");
  await addToBasket.click();

  // goto basket
  const gotoBasket = await page.$("button.goto-basket");
  await gotoBasket.click();

  await page.waitForURL("http://localhost:4000/shop/basket");
  expect(page.url()).toBe("http://localhost:4000/shop/basket");

  // add gift wrapping
  const giftWrap = await page.waitForSelector("[data-testid=add-gift-wrap-0]", {
    state: "attached",
  });

  await page.waitForTimeout(500);
  await giftWrap.setChecked(true);

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

  // remove product from basket
  const removeProduct = await page.locator("text=- >> nth=0");
  await removeProduct.click({ force: true });

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
});
