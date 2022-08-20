import { isWhitelistedUserAgent } from "$lib/utils/consts";

export async function load({ request }) {
  const userAgent = request?.headers.get("User-Agent");

  return {
    whitelistedUserAgent: isWhitelistedUserAgent(userAgent),
  };
}
