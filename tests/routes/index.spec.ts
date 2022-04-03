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
  DESKTOP_ABOUT_GIF,
} from "../../src/lib/utils/consts";
import { expect, test } from "@playwright/test";

test.describe("Mobile Home Page", () => {
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

test.describe("Desktop Home Page", () => {
  // Run tests in this describe block with portrait-like viewport.
  test.use({ viewport: { width: 1280, height: 2400 } });

  test("loads desktop with correct assets", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("figure")).toHaveClass(/^container/);
    await expect(page.locator("img.inside-shop")).toHaveAttribute(
      "src",
      DESKTOP_LANDING_PAGE + "&h=2400&w=1280"
    );

    await expect(page.locator("img.repairs-and-comms")).toHaveAttribute(
      "src",
      DESKTOP_JEWELLERY_SERVICES_STATIC
    );
    const handleRepairs = await page.$("img.repairs-and-comms");
    await handleRepairs.hover();
    await expect(page.locator("img.repairs-and-comms")).toHaveAttribute(
      "src",
      DESKTOP_JEWELLERY_SERVICES_GIF
    );
    await page.locator("img.repairs-and-comms").click();
    await page.waitForURL("http://localhost:4000/repairs");
    expect(page.url()).toBe("http://localhost:4000/repairs");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("img.classes")).toHaveAttribute(
      "src",
      DESKTOP_JEWELLERY_CLASSES_STATIC
    );
    const handleClasses = await page.$("img.classes");
    await handleClasses.hover();
    await expect(page.locator("img.classes")).toHaveAttribute(
      "src",
      DESKTOP_JEWELLERY_CLASSES_GIF
    );
    await page.locator("img.classes").click();
    await page.waitForURL("http://localhost:4000/classes");
    expect(page.url()).toBe("http://localhost:4000/classes");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("img.online-shop")).toHaveAttribute(
      "src",
      DESKTOP_ONLINE_SHOP_STATIC
    );
    const handleOnlineShop = await page.$("img.online-shop");
    await handleOnlineShop.hover();
    await expect(page.locator("img.online-shop")).toHaveAttribute(
      "src",
      DESKTOP_ONLINE_SHOP_GIF
    );
    await page.locator("img.online-shop").click();
    await page.waitForURL("http://localhost:4000/shop");
    expect(page.url()).toBe("http://localhost:4000/shop");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("img.about")).toHaveAttribute(
      "src",
      DESKTOP_ABOUT_STATIC
    );
    const handleAbout = await page.$("img.about");
    await handleAbout.hover();
    await expect(page.locator("img.about")).toHaveAttribute(
      "src",
      DESKTOP_ABOUT_GIF
    );
    await page.locator("img.about").click();
    await page.waitForURL("http://localhost:4000/about");
    expect(page.url()).toBe("http://localhost:4000/about");
    await page.goBack();
    expect(page.url()).toBe("http://localhost:4000/");
  });
});
