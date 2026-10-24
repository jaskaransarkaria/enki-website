const whitelistedUserAgent = [
  "Googlebot",
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
];

export const isWhitelistedUserAgent = (userAgent) =>
  Boolean(
    whitelistedUserAgent.filter((agent) => userAgent?.includes(agent)).length,
  );
