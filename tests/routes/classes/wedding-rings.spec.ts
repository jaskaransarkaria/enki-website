import { expect, test } from "@playwright/test";

test("Classes Wedding Ring Page", async ({ page }) => {
  await page.goto("/classes/beginners")
  await expect(page.locator(".class-pics > img >> nth=0")).toHaveAttribute("src", "https://enki.imgix.net/classes_example_1.jpg?auto=format,compress")
  await expect(page.locator(".class-pics > img >> nth=1")).toHaveAttribute("src", "https://enki.imgix.net/classes_example_2.jpg?auto=format,compress")
  await expect(page.locator(".class-pics > img >> nth=2")).toHaveAttribute("src", "https://enki.imgix.net/classes_example_3.jpg?auto=format,compress")
  await page.locator("a >> nth=0").click()
  await page.waitForURL("http://localhost:4000/contact")
  await page.goBack()
  await page.waitForURL("http://localhost:4000/classes/beginners")

  await expect(page.locator(".container > p")).toHaveText(`Ever wanted to learn to make your own jewellery? Looking for a unique
    present for a friend? At Enki workshops you can meet new people
    and learn a new craft. The one off classes include all the tools and
    materials needed to make your jewellery, soft and hot drinks, and cake from
    the wonderful Early Bird Bakery next door. We also take group
    bookings where you can choose the date and topic, get in contact
    here with any enquiries.`)

  await expect(page.locator(".tt-widget")).toHaveCount(1)
})
