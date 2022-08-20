export async function load({ parent }) {
  const { whitelistedUserAgent } = await parent();
  return {
    whitelistedUserAgent,
  };
}
