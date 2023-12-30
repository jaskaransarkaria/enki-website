import { expect, test } from "@playwright/test";

test.describe("Header", () => {
  test("shows mobile header", async ({ page }) => {
    await page.setViewportSize({ width: 350, height: 900 });
    await page.goto("/");

    await expect(page.locator("#nav-icon")).toHaveClass(/(?!open)/);
    await expect(page.locator("img.enki-logo")).toHaveAttribute(
      "src",
      "https://storage.googleapis.com/enki-website/header_1.png"
    );

    await page.locator("#nav-icon").click();

    await expect(page.locator("#nav-icon")).toHaveClass(/open/);
    await expect(page.locator("button>> nth=0")).toHaveText("shop");
    await page.locator("button>> nth=0").click();
    await page.waitForURL("http://localhost:4000/shop/");
    expect(page.url()).toBe("http://localhost:4000/shop/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("#nav-icon").click();

    await expect(page.locator("button>> nth=1")).toHaveText("gift guide");
    await page.locator("button>> nth=1").click();
    await page.waitForURL("http://localhost:4000/gift-guide/");
    expect(page.url()).toBe("http://localhost:4000/gift-guide/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("#nav-icon").click();

    await expect(page.locator("button>> nth=2")).toHaveText("repairs");
    await page.locator("button>> nth=2").click();
    await page.waitForURL("http://localhost:4000/repairs/");
    expect(page.url()).toBe("http://localhost:4000/repairs/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("#nav-icon").click();

    await expect(page.locator("button>> nth=3")).toHaveText("classes");
    await page.locator("button>> nth=3").click();
    await page.waitForURL("http://localhost:4000/classes/");
    expect(page.url()).toBe("http://localhost:4000/classes/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("#nav-icon").click();

    await expect(page.locator("button>> nth=4")).toHaveText("about");
    await page.locator("button>> nth=4").click();
    await page.waitForURL("http://localhost:4000/about/");
    expect(page.url()).toBe("http://localhost:4000/about/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");
    await page.locator("#nav-icon").click();

    await expect(page.locator("button>> nth=5")).toHaveText("contact");
    await page.locator("button>> nth=5").click();
    await page.waitForURL("http://localhost:4000/contact/");
    expect(page.url()).toBe("http://localhost:4000/contact/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await page.locator("#nav-icon").click();
    await expect(page.locator("#nav-icon")).toHaveClass(/(?!open)/);
  });

  test("shows desktop header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2400 });
    await page.goto("/");
    await expect(page.locator("#nav-icon")).toHaveCount(0);

    await expect(page.locator("a >> nth=0")).toHaveText("shop");
    await page.locator("a >> nth=0").click();
    await page.waitForURL("http://localhost:4000/shop/");
    expect(page.url()).toBe("http://localhost:4000/shop/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("a >> nth=1")).toHaveText("gift guide");
    await page.locator("a >> nth=1").click();
    await page.waitForURL("http://localhost:4000/gift-guide/");
    expect(page.url()).toBe("http://localhost:4000/gift-guide/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("a >> nth=2")).toHaveText("repairs");
    await page.locator("a >> nth=2").click();
    await page.waitForURL("http://localhost:4000/repairs/");
    expect(page.url()).toBe("http://localhost:4000/repairs/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("a >> nth=3")).toHaveText("classes");
    await page.locator("a >> nth=3").click();
    await page.waitForURL("http://localhost:4000/classes/");
    expect(page.url()).toBe("http://localhost:4000/classes/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("a >> nth=4")).toHaveText("about");
    await page.locator("a >> nth=4").click();
    await page.waitForURL("http://localhost:4000/about/");
    expect(page.url()).toBe("http://localhost:4000/about/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("a >> nth=5")).toHaveText("contact");
    await page.locator("a >> nth=5").click();
    await page.waitForURL("http://localhost:4000/contact/");
    expect(page.url()).toBe("http://localhost:4000/contact/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    // this block clicks each of the links in the header without returning to the homepage
    // making sure they go to the correct place
    await page.locator("a >> nth=0").click();
    await page.waitForURL("http://localhost:4000/shop/");
    expect(page.url()).toBe("http://localhost:4000/shop/");
    await page.locator("a >> nth=1").click();
    await page.waitForURL("http://localhost:4000/gift-guide/");
    expect(page.url()).toBe("http://localhost:4000/gift-guide/");
    await page.locator("a >> nth=2").click();
    await page.waitForURL("http://localhost:4000/repairs/");
    expect(page.url()).toBe("http://localhost:4000/repairs/");
    await page.locator("a >> nth=3").click();
    await page.waitForURL("http://localhost:4000/classes/");
    expect(page.url()).toBe("http://localhost:4000/classes/");
    await page.locator("a >> nth=4").click();
    await page.waitForURL("http://localhost:4000/about/");
    expect(page.url()).toBe("http://localhost:4000/about/");
    await page.locator("a >> nth=5").click();
    await page.waitForURL("http://localhost:4000/contact/");
    expect(page.url()).toBe("http://localhost:4000/contact/");
    await page.locator("img.enki-logo").click();
    await page.waitForURL("http://localhost:4000/");
    expect(page.url()).toBe("http://localhost:4000/");

    await expect(page.locator("img.enki-logo")).toHaveAttribute(
      "src",
      "https://storage.googleapis.com/enki-website/header_1.png"
    );

    await expect(page.locator("img.search-icon")).toHaveAttribute(
      "src",
      "https://storage.googleapis.com/enki-website/search-icon.png"
    );

    await expect(page.locator("img.basket-icon")).toHaveAttribute(
      "src",
      "https://storage.googleapis.com/enki-website/basket-icon.png"
    );
  });
});
