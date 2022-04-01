import { expect, test } from "@playwright/test";

test("Classes Index Page", async ({ page }) => {
  await page.goto("/classes/beginners")
  await expect(page.locator(".class-button > img >> nth=0")).toHaveAttribute("src", "https://enki.imgix.net/group_portrait.png?auto=format,compress")
  await page.locator(".class-button > img >> nth=0").click()
  await page.waitForURL("http://localhost:4000/classes/beginners")
  await page.goBack()
  await page.waitForURL("http://localhost:4000/classes")
  await expect(page.locator(".class-button > img >> nth=1")).toHaveAttribute("src", "https://enki.imgix.net/wedding_portrait.png?auto=format,compress")
  await page.locator(".class-button > img >> nth=1").click()
  await page.waitForURL("http://localhost:4000/classes/wedding-rings")
  await page.goBack()
  await page.waitForURL("http://localhost:4000/classes/beginners")
})
