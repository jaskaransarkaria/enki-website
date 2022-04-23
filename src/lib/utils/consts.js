export const MOBILE_LANDING_PAGE =
  "https://enki.imgix.net/mobile_landing_page_2.png?fit=crop";
export const MOBILE_ONLINE_SHOP =
  "https://enki.imgix.net/mobile_online_shop.png?auto=format,compress";
export const MOBILE_JEWELLERY_CLASSES =
  "https://enki.imgix.net/mobile_jewellery_classes.png?auto=format,compress";
export const MOBILE_JEWELLERY_SERVICES =
  "https://enki.imgix.net/mobile_jewellery_services.png?auto=format,compress";
export const MOBILE_CONTACT_US =
  "https://enki.imgix.net/mobile_contact_us.png?auto=format,compress";
export const MOBILE_ABOUT_US =
  "https://enki.imgix.net/mobile_about_us.png?auto=format,compress";
export const DESKTOP_LANDING_PAGE =
  "https://enki.imgix.net/inside_enki_desktop_3.png?auto=format,compress";
export const DESKTOP_JEWELLERY_SERVICES_GIF =
  "https://enki.imgix.net/jewellery_services_2.gif";
export const DESKTOP_JEWELLERY_SERVICES_STATIC =
  "https://enki.imgix.net/jewellery_services_2.png?auto=compress";
export const DESKTOP_JEWELLERY_CLASSES_GIF =
  "https://enki.imgix.net/classes_3.gif";
export const DESKTOP_JEWELLERY_CLASSES_STATIC =
  "https://enki.imgix.net/classes_2.png?auto=compress";
export const DESKTOP_ONLINE_SHOP_GIF =
  "https://enki.imgix.net/online_shop_3.gif";
export const DESKTOP_ONLINE_SHOP_STATIC =
  "https://enki.imgix.net/online_shop_3.png?auto=compress";
export const DESKTOP_ABOUT_GIF = "https://enki.imgix.net/about_us_1.gif";
export const DESKTOP_ABOUT_STATIC =
  "https://enki.imgix.net/about_us_1.png?auto=compress";

const whitelistedUserAgent = ["GoogleBot"];

export const isWhitelistedUserAgent = (userAgent) =>
  Boolean(whitelistedUserAgent.filter((agent) => userAgent?.includes(agent)));
