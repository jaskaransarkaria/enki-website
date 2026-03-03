import { beforeNavigate } from "$app/navigation";
import { updated } from "$app/state";

beforeNavigate(({ willUnload, to }) => {
  if (updated.current && !willUnload && to?.url) {
    location.href = to.url.href;
  }
});

export const trailingSlash = "never";
