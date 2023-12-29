import { PUBLIC_BUCKET_URL } from "$env/static/public";

export const MOBILE_LANDING_PAGE = `${PUBLIC_BUCKET_URL}/mobile_landing_page_2.png`;
export const MOBILE_ONLINE_SHOP = `${PUBLIC_BUCKET_URL}/mobile_online_shop_3.png`;
export const MOBILE_JEWELLERY_CLASSES = `${PUBLIC_BUCKET_URL}/mobile_jewellery_classes_3.png`;
export const MOBILE_JEWELLERY_SERVICES = `${PUBLIC_BUCKET_URL}/mobile_jewellery_repairs_3.png`;
export const MOBILE_CONTACT_US = `${PUBLIC_BUCKET_URL}/mobile_contact_us_3.png`;
export const MOBILE_ABOUT_US = `${PUBLIC_BUCKET_URL}/mobile_about_us_3.png`;
export const MOBILE_GIFT_GUIDE = `${PUBLIC_BUCKET_URL}/mobile_gift_guide_1.png`;

export const DESKTOP_LANDING_PAGE = `${PUBLIC_BUCKET_URL}/inside_enki_desktop_4.png`;

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
