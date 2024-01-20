import mobileGiftGuide from "$lib/assets/mobile_gift_guide_1.png";
import mobileAboutUs from "$lib/assets/mobile_about_us_3.png";
import mobileContactUs from "$lib/assets/mobile_contact_us_3.png";
import mobileJewelleryRepairs from "$lib/assets/mobile_jewellery_repairs_3.png";
import mobileJewelleryClasses from "$lib/assets/mobile_jewellery_classes_3.png";
import mobileOnlineShop from "$lib/assets/mobile_online_shop_3.png";
import mobileLandingPage from "$lib/assets/mobile_landing_page_2.png";
import desktopLandingPagePng from "$lib/assets/inside_enki_desktop_4.png";
import desktopLandingPageAvif from "$lib/assets/inside_enki_desktop_4.avif";

export const MOBILE_LANDING_PAGE = mobileLandingPage;
export const MOBILE_ONLINE_SHOP = mobileOnlineShop;
export const MOBILE_JEWELLERY_CLASSES = mobileJewelleryClasses;
export const MOBILE_JEWELLERY_SERVICES = mobileJewelleryRepairs;
export const MOBILE_CONTACT_US = mobileContactUs;
export const MOBILE_ABOUT_US = mobileAboutUs;
export const MOBILE_GIFT_GUIDE = mobileGiftGuide;

export const DESKTOP_LANDING_PAGE_PNG = desktopLandingPagePng;
export const DESKTOP_LANDING_PAGE_AVIF = desktopLandingPageAvif;

const whitelistedUserAgent = [
  "GoogleBot",
  "Twitterbot",
  "facebookexternalhit",
  "baiduspider",
  "baiduspider-mobile",
  "bingbot",
  "msnbot",
  "DuckDuckGoBot",
  "Googlebot-Mobile",
  "slurp",
  "yandex",
  "sitemap-generator-cli",
];

export const isWhitelistedUserAgent = (userAgent) =>
  Boolean(
    whitelistedUserAgent.filter((agent) => userAgent?.includes(agent)).length
  );
