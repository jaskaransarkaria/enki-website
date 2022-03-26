import {
  MOBILE_CONTACT_US,
  MOBILE_JEWELLERY_CLASSES,
  MOBILE_JEWELLERY_SERVICES,
  MOBILE_LANDING_PAGE,
  MOBILE_ONLINE_SHOP,
  MOBILE_ABOUT_US,
  DESKTOP_LANDING_PAGE,
  DESKTOP_JEWELLERY_SERVICES_STATIC,
  DESKTOP_JEWELLERY_SERVICES_GIF,
  DESKTOP_JEWELLERY_CLASSES_STATIC,
  DESKTOP_JEWELLERY_CLASSES_GIF,
  DESKTOP_ONLINE_SHOP_STATIC,
  DESKTOP_ONLINE_SHOP_GIF,
  DESKTOP_ABOUT_STATIC,
  DESKTOP_ABOUT_GIF
} from "../src/lib/utils/consts";
import { expect, test } from "@playwright/test";

test.describe("Mobile Home page", () => {
  // Run tests in this describe block with portrait-like viewport.
  test.use({ viewport: { width: 350, height: 900 } });

  test("loads mobile with correct assets", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("figure")).toHaveClass(/mobile-container/);
    await expect(page.locator("img.parallax-inside-shop")).toHaveClass(
      /parallax-inside-shop/
    );
    await expect(page.locator("img.parallax-inside-shop")).toHaveAttribute(
      "alt",
      "welcome to the shop, this illustration shows the shopkeeper behind her bench"
    );
    await expect(page.locator("img.parallax-inside-shop")).toHaveAttribute(
      "src",
      `${MOBILE_LANDING_PAGE}&h=900&w=350`
    );
    await expect(page.locator("section.mobile-scroll-prompt")).toHaveText(
      "scroll"
    );

    await expect(page.locator("img.mobile-online-shop")).toHaveAttribute(
      "src",
      MOBILE_ONLINE_SHOP
    );

    await expect(page.locator("img.mobile-repairs-and-comms")).toHaveAttribute(
      "src",
      MOBILE_JEWELLERY_SERVICES
    );

    await expect(page.locator("img.mobile-classes")).toHaveAttribute(
      "src",
      MOBILE_JEWELLERY_CLASSES
    );

    await expect(page.locator("img.mobile-contact-us")).toHaveAttribute(
      "src",
      MOBILE_CONTACT_US
    );

    await expect(page.locator("img.mobile-about-us")).toHaveAttribute(
      "src",
      MOBILE_ABOUT_US
    );
  });


});

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

test.describe("Header", () => {
  test("shows mobile header", async ({ page }) => {
    await page.setViewportSize({width: 350, height: 900})
    await page.goto("/");

    await expect(page.locator("#nav-icon")).toHaveClass(/(?!open)/);

    await page.locator("#nav-icon").click();

    await expect(page.locator("#nav-icon")).toHaveClass(/open/);
    await expect(page.locator('button >> nth=0')).toHaveText('shop')
    await expect(page.locator('button >> nth=1')).toHaveText('repairs')
    await expect(page.locator('button >> nth=2')).toHaveText('classes')
    await expect(page.locator('button >> nth=3')).toHaveText('about')
    await expect(page.locator('button >> nth=4')).toHaveText('contact')

    await page.locator("#nav-icon").click();
    await expect(page.locator("#nav-icon")).toHaveClass(/(?!open)/);
  });

  test("shows desktop header", async ({ page }) => {
    await page.setViewportSize({width: 1280, height: 2400})
    await page.goto("/")
    await expect(page.locator("#nav-icon")).toHaveCount(0);

    await expect(page.locator('button >> nth=0')).toHaveText('shop')
    await expect(page.locator('button >> nth=1')).toHaveText('repairs')
    await expect(page.locator('button >> nth=2')).toHaveText('classes')
    await expect(page.locator('button >> nth=3')).toHaveText('about')
    await expect(page.locator('button >> nth=4')).toHaveText('contact')

    await expect(page.locator("img.enki-logo")).toHaveAttribute("src", "https://enki.imgix.net/header_1.png?auto=format,compress")

    await expect(page.locator("img.search-icon")).toHaveAttribute("src", "https://enki.imgix.net/search-icon.png?auto=format,compress")

    await expect(page.locator("img.basket-icon")).toHaveAttribute("src", "https://enki.imgix.net/basket-icon.png?auto=format,compress")
  })
})

test.describe("Footer", () => {
  test("shows mobile footer", async ({ page }) => {
    await page.setViewportSize({width: 350, height: 900})
    await page.goto("/")
    await expect(page.locator(".telephone")).toHaveCount(0)
    await expect(page.locator("h3")).toHaveText("want to be the first to find out about new products and classes?")
    await expect(page.locator("#mc_embed_signup")).toHaveCount(1)
    await expect(page.locator("a")).toHaveAttribute("href", "https://stripe.com/docs/payments/cards/supported-card-brands")
    await expect(page.locator(".trust-badge")).toHaveAttribute("src", "/stripe-badge-white.png")
  })

  test("shows desktop footer", async ({ page }) => {
    await page.setViewportSize({width: 1280, height: 2400})
    await page.goto("/")
    await expect(page.locator(".telephone")).toHaveCount(1)
    await expect(page.locator("h3")).toHaveText("want to be the first to find out about new products and classes?")
    await expect(page.locator("#mc_embed_signup")).toHaveCount(1)
    await expect(page.locator("a")).toHaveAttribute("href", "https://stripe.com/docs/payments/cards/supported-card-brands")
    await expect(page.locator(".trust-badge")).toHaveAttribute("src", "/stripe-badge-white.png")
  })
})

test.describe("Desktop Home page", () => {
  // Run tests in this describe block with portrait-like viewport.
  test.use({ viewport: { width: 1280, height: 2400 } });

  test("loads desktop with correct assets", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("figure")).toHaveClass(/^container/);
    await expect(page.locator("img.inside-shop")).toHaveAttribute("src", DESKTOP_LANDING_PAGE+"&h=2400&w=1280")

    await expect(page.locator("img.repairs-and-comms")).toHaveAttribute("src", DESKTOP_JEWELLERY_SERVICES_STATIC)
    const handleRepairs = await page.$('img.repairs-and-comms');
    await handleRepairs.hover()
    await expect(page.locator("img.repairs-and-comms")).toHaveAttribute("src", DESKTOP_JEWELLERY_SERVICES_GIF)

    await expect(page.locator("img.classes")).toHaveAttribute("src", DESKTOP_JEWELLERY_CLASSES_STATIC)
    const handleClasses = await page.$('img.classes');
    await handleClasses.hover()
    await expect(page.locator("img.classes")).toHaveAttribute("src", DESKTOP_JEWELLERY_CLASSES_GIF)

    await expect(page.locator("img.online-shop")).toHaveAttribute("src", DESKTOP_ONLINE_SHOP_STATIC)
    const handleOnlineShop = await page.$('img.online-shop');
    await handleOnlineShop.hover()
    await expect(page.locator("img.online-shop")).toHaveAttribute("src", DESKTOP_ONLINE_SHOP_GIF)

    await expect(page.locator("img.about")).toHaveAttribute("src", DESKTOP_ABOUT_STATIC)
    const handleAbout = await page.$('img.about');
    await handleAbout.hover()
    await expect(page.locator("img.about")).toHaveAttribute("src", DESKTOP_ABOUT_GIF)
  })
})
