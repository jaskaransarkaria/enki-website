import { expect, test } from "@playwright/test";

test.describe("Back to the top button", () => {
  test("shows back to top", async ({ page }) => {
    await page.goto("/")
    await expect(page.isHidden("button >> text=^")).toBeTruthy()
    await page.evaluate(async () => {
      for (let i = 0; i < document.body.scrollHeight; i += 50) {
        window.scrollTo(0, i);
      }
    });
    await expect(page.isVisible("button >> text=^")).toBeTruthy()
    await expect(page.isVisible(".back-to-top")).toBeTruthy()
    await page.click("button >> text=^", { force: true })
    await expect(page.locator(".back-to-top")).toBeHidden()
  })
})

