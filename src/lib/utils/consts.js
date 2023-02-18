export const MOBILE_LANDING_PAGE =
  "https://enki.imgix.net/mobile_landing_page_2.png?auto=format&fit=crop";
export const MOBILE_ONLINE_SHOP =
  "https://enki.imgix.net/mobile_online_shop_3.png?auto=format,compress";
export const MOBILE_JEWELLERY_CLASSES =
  "https://enki.imgix.net/mobile_jewellery_classes_3.png?auto=format,compress";
export const MOBILE_JEWELLERY_SERVICES =
  "https://enki.imgix.net/mobile_jewellery_repairs_3.png?auto=format,compress";
export const MOBILE_CONTACT_US =
  "https://enki.imgix.net/mobile_contact_us_3.png?auto=format,compress";
export const MOBILE_ABOUT_US =
  "https://enki.imgix.net/mobile_about_us_3.png?auto=format,compress";
export const DESKTOP_LANDING_PAGE =
  "https://enki.imgix.net/inside_enki_desktop_4.png?auto=format,compress";

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
