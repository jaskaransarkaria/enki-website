import { expect, test } from "@playwright/test";

test("shows a busy cursor while a category navigation is loading", async ({
  page,
}) => {
  const delay = async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await route.continue();
  };

  // Slow down the client-side category data fetches so the navigation is
  // observable (otherwise preloading makes it near-instant).
  await page.route("**/category?id=*", delay);
  await page.route("**/products-by-category*", delay);

  await page.goto("/shop");

  const html = page.locator("html");
  await expect(html).not.toHaveClass(/navigating/);

  await page.locator("a.hex-link").first().click();

  await expect(html).toHaveClass(/navigating/);

  await page.waitForURL("**/shop/category/**");
  await expect(html).not.toHaveClass(/navigating/);
});
