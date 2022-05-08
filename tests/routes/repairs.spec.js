import { expect, test } from "@playwright/test";

test.describe("Mobile Repairs Page", () => {
  test.use({ viewport: { width: 350, height: 900 } });
  test("Repairs page", async ({ page }) => {
    await page.goto("/repairs");

    await expect(
      page.locator("[data-testid=swipe-img] >> nth=0")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_1.jpg?auto=format,compress"
    );
    await expect(
      page.locator("[data-testid=swipe-img]  >> nth=1")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_2.jpg?auto=format,compress"
    );
    await expect(
      page.locator("[data-testid=swipe-img]  >> nth=2")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_4.jpg?auto=format,compress"
    );
    await expect(
      page.locator("[data-testid=swipe-img] >> nth=3")
    ).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_3.jpg?auto=format,compress"
    );
    await expect(page.locator(".container > p"))
      .toHaveText(`Got a necklace you're afraid to wear because the clasp sometimes fails?
      Have a ring you've loved for such a long time that the shank has worn away
      to nothing? We hate to see jewellery thrown away, bring it in and we’ll
      get it back to its former glory. We can even create a new partner for a
      lonely earring! Click here to get in touch.`);
    await expect(page.locator("h2")).toHaveText("Testimonials");
    await expect(
      page.locator(".testimonials-container > p >> nth=0")
    ).toHaveText(
      '"Beautiful little shop. I needed a bracelet repaired and a ring setting. Faith gave me some great advice and the repairs were done quickly." - Alexandra B'
    );
    await expect(
      page.locator(".testimonials-container > p >> nth=1")
    ).toHaveText(
      '"Had my wedding ring cut off due to swollen finger, it was repaired with an additional piece added, not the slightest sign anything had happened . Would recommend her to anyone. Thank you." - Will M'
    );
    await expect(
      page.locator(".testimonials-container > p >> nth=2")
    ).toHaveText(
      '"I ran into trouble restoring an old Gretsch snare drum of huge sentimental value to me - the modern part I\'d sourced in the USA arrived but some delicate filing was needed in order to fit the part to the existing mechanism… The staff were friendly and took a real interest in        the project and carefully carried out the delicate job there and then. I could not be happier and would highly recommend the store, its staff and their considerable - and adaptable - expertise." - Dave T'
    );
    await expect(
      page.locator(".testimonials-container > p >> nth=3")
    ).toHaveText(
      '"I took a diamond ring to Enki to be repaired. The lady listened to my description of what was wrong. She used several tools to look at the ring and complete the repair. I was in and out in ten minutes with my ring repaired and very shiny. Fantastic service and very knowledgeable. Highly recommended." - Claire B'
    );
    await expect(page.locator("hr")).toHaveCount(3);
  });
});

test.describe("Desktop Repairs Page", () => {
  test.use({ viewport: { width: 1280, height: 2400 } });
  test("Repairs page", async ({ page }) => {
    await page.goto("/repairs");

    await expect(page.locator(".shop-pics > img >> nth=0")).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_1.jpg?auto=format,compress"
    );
    await expect(page.locator(".shop-pics > img >> nth=1")).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_2.jpg?auto=format,compress"
    );
    await expect(page.locator(".shop-pics > img >> nth=2")).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_3.jpg?auto=format,compress"
    );
    await expect(page.locator(".shop-pics > img >> nth=3")).toHaveAttribute(
      "src",
      "https://enki.imgix.net/services_4.jpg?auto=format,compress"
    );
    await expect(page.locator(".container > p"))
      .toHaveText(`Got a necklace you're afraid to wear because the clasp sometimes fails?
      Have a ring you've loved for such a long time that the shank has worn away
      to nothing? We hate to see jewellery thrown away, bring it in and we’ll
      get it back to its former glory. We can even create a new partner for a
      lonely earring! Click here to get in touch.`);
    await expect(page.locator("h2")).toHaveText("Testimonials");
    await expect(page.locator(".testimonials-container > p >> nth=0"))
      .toHaveText(`"Beautiful little shop. I needed a bracelet repaired and a ring
          setting. Faith gave me some great advice and the repairs were done
          quickly." - Alexandra B


          "Had my wedding ring cut off due to swollen finger, it was repaired with
          an additional piece added, not the slightest sign anything had happened
          . Would recommend her to anyone. Thank you." - Will M`);
    await expect(
      page.locator(".testimonials-container > p >> nth=1")
    ).toHaveText(
      '"I ran into trouble restoring an old Gretsch snare drum of huge sentimental value to me - the modern part I\'d sourced in the USA arrived but some delicate filing was needed in order to fit the part to the existing mechanism… The staff were friendly and took a real interest in        the project and carefully carried out the delicate job there and then. I could not be happier and would highly recommend the store, its staff and their considerable - and adaptable - expertise." - Dave T'
    );
    await expect(
      page.locator(".testimonials-container > p >> nth=2")
    ).toHaveText(
      '"I took a diamond ring to Enki to be repaired. The lady listened to my description of what was wrong. She used several tools to look at the ring and complete the repair. I was in and out in ten minutes with my ring repaired and very shiny. Fantastic service and very knowledgeable. Highly recommended." - Claire B'
    );
    await expect(page.locator("hr")).toHaveCount(2);
  });
});
