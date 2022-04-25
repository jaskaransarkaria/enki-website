import { expect, test } from "@playwright/test";

test.skip("Classes Index Page", async ({ page }) => {
  await page.goto("/classes");
  await expect(page.locator(".class-button > img >> nth=0")).toHaveAttribute(
    "src",
    "/group_classes.png"
  );
  await page.locator(".class-button > img >> nth=0").click();
  await page.waitForURL("http://localhost:4000/classes/beginners");
  await page.goBack();
  await page.waitForURL("http://localhost:4000/classes");
  await expect(page.locator(".class-button > img >> nth=1")).toHaveAttribute(
    "src",
    "/wedding_ring_classes.png"
  );
  await page.locator(".class-button > img >> nth=1").click();
  await page.waitForURL("http://localhost:4000/classes/wedding-rings");
  await page.goBack();
  await page.waitForURL("http://localhost:4000/classes");
});
