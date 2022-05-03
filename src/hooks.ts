export const getSession = async ({ request }) => {
  return {
    userAgent: request.headers.get("User-Agent"),
    test: true,
  };
};
