import { expect, test } from "@playwright/test";

test("Contact Page", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator(".contact-info > h1 >> nth=0")).toHaveText(
    "Contact us"
  );
  await expect(page.locator(".map")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/maps.png?auto=format,compress"
  );
  await expect(page.locator(".telephone")).toHaveAttribute(
    "src",
    "https://enki.imgix.net/telephone.png?auto=format,compress"
  );
  await expect(page.locator("address")).toHaveText(
    "30 High Street Kings Heath, B14 7JT Open every day 10am-5pm"
  );
  await expect(page.locator("p > a >> nth=0")).toHaveText("01214444453");
  await expect(page.locator("p > a >> nth=1")).toHaveText("07712442736");
  await expect(page.locator(".contact-info > h1 >> nth=1")).toHaveText(
    "Submissions"
  );
  await expect(page.locator(".submissions-text")).toHaveText(
    "If you have a product you would like us to consider stocking at Enki, please send us an email with images, cost prices, minimum order quantities and links to your website and social media. We get a lot of these requests and are limited on space so unfortunately are only able to take a small selection of the submissions we receive."
  );
});
