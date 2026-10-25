import { page } from "$app/state";

/**
 * Seeds a component's reactive `outerWidth` so the server-rendered markup
 * matches the first client render. The value comes from
 * `src/routes/+layout.server.ts`; once mounted, `svelte:window` replaces it
 * with the real `window.outerWidth`.
 */
export function initialViewportWidth(): number {
  return (page.data as { initialWidth?: number }).initialWidth ?? 0;
}
