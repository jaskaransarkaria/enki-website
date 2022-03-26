import { expect, test } from "@playwright/test";

test("About Page", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(".shop-pics > img >> nth=0")).toHaveAttribute("src", "https://enki.imgix.net/left_enki.jpg?auto=format,compress");
  await expect(page.locator(".shop-pics > img >> nth=1")).toHaveAttribute("src", "https://enki.imgix.net/about_shop_1.jpg?auto=format,compress");
  await expect(page.locator(".shop-pics > img >> nth=2")).toHaveAttribute("src", "https://enki.imgix.net/right_enki.png?auto=format,compress");
  expect(await page.textContent("h2")).toBe("Meet the team");
  await expect(page.locator(".card > img >> nth=0")).toHaveAttribute("src", "https://enki.imgix.net/faith.png?auto=format,compress");
  await expect(page.locator(".card > img >> nth=1")).toHaveAttribute("src", "https://enki.imgix.net/dora.png?auto=format,compress");
  await expect(page.locator(".card > img >> nth=2")).toHaveAttribute("src", "https://enki.imgix.net/ash.png?auto=format,compress");
  await expect(page.locator(".card > p >> nth=0")).toHaveText("Faith started Enki in 2017 in a small shop round the corner from the current location. She is a jeweller with over ten years of experience who specialises in repairing antique jewellery. She also loves to read and cook. She has a dog called Dodi who sometimes joins her at work! You can find her at Enki from Tuesday to Friday.")
  await expect(page.locator(".card > p >> nth=1")).toHaveText("Dora joined Enki in 2018 and has been learning jewellery making ever since, she’s always been a crafter and can do amazing things with beads! She comes from Germany but has been in Brum for the last six years. You can find her at Enki Wednesday to Saturday and every other Sunday.")
  await expect(page.locator(".card > p >> nth=2")).toHaveText("Ash Joined Enki in 2021, he’s a web developer who dabbles in photography among other things!")
});
