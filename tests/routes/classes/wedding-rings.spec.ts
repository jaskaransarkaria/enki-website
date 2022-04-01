import { expect, test } from "@playwright/test";

test("Classes Wedding Ring Page", async ({ page }) => {
  await page.goto("/classes/wedding-rings")
  await expect(page.locator(".class-pics > img >> nth=0")).toHaveAttribute("src", "https://enki.imgix.net/wedding_bands_1.jpg?auto=compress")
  await expect(page.locator(".class-pics > img >> nth=1")).toHaveAttribute("src", "https://enki.imgix.net/wedding_bands_2.jpg?auto=compress")
  await expect(page.locator(".class-pics > img >> nth=2")).toHaveAttribute("src", "https://enki.imgix.net/wedding_bands_3.jpg?auto=compress")

  await expect(page.locator("h1")).toHaveText("Make your partner the most important piece of jewellery they’ll ever own")
  await expect(page.locator(".container > p >> nth=0")).toHaveText(`In this private class for you and your partner, you will make each other a
    wedding ring, guided by our resident jeweller, Faith.


    You will start with an initial silver practice ring which you will be able to
    take home after the class. You will then make the real thing in gold or the metal
    of your choice. After the class Faith will take them away to be hallmarked and
    will return them to you within two weeks.


    To make the experience extra special we provide cake from the wonderful Early
    Bird Bakery next door. If you aren't local we can give you lots of tips on where
    to stay and what to do in the area if you want to make a mini-break of it. If
    you have any queries please contact us here`)
})
