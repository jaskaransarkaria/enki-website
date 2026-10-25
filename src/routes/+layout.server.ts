import type { LayoutServerLoad } from "./$types";

const MOBILE_USER_AGENT =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Windows Phone/i;

// The viewport width isn't available while rendering on the server, so the
// mobile/desktop layouts would otherwise be chosen from a default of 0 and
// "flash" the mobile layout before hydration. Approximate the viewport from
// low-entropy client hints (Chromium) or the User-Agent (everyone else) and
// hand it to the client as the initial `outerWidth`. Any value above the
// largest breakpoint (1280) renders the desktop layout, any value below the
// smallest (450) renders the mobile one.
function detectInitialWidth(request: Request): number {
  const clientHint = request.headers.get("sec-ch-ua-mobile");
  const isPhone =
    clientHint !== null
      ? clientHint === "?1"
      : MOBILE_USER_AGENT.test(request.headers.get("user-agent") ?? "");

  return isPhone ? 320 : 1440;
}

export const load: LayoutServerLoad = ({ request }) => ({
  initialWidth: detectInitialWidth(request),
});
