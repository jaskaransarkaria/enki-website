export async function load({ parent }) {
  const { whitelistedUserAgent } = await parent();
  return {
    whitelistedUserAgent,
  };
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
export const prerender = true;
