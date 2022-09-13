import "@testing-library/jest-dom/extend-expect";
import { vi, afterAll } from "vitest";

vi.mock("$app/navigation", () => ({
  goto: vi.fn(),
}));

vi.mock("$app/environment", () => ({
  amp: false,
  browser: true,
  dev: true,
  mode: "test",
}));

// @ts-ignore
global.jest = vi;

import getCanvasWindow from "jest-canvas-mock/lib/window";

const canvasWindow = getCanvasWindow({ document: window.document });
const apis = [
  "Path2D",
  "CanvasGradient",
  "CanvasPattern",
  "CanvasRenderingContext2D",
  "DOMMatrix",
  "ImageData",
  "TextMetrics",
  "ImageBitmap",
  "createImageBitmap",
] as const;

apis.forEach((api) => {
  global[api] = canvasWindow[api];
  global.window[api] = canvasWindow[api];
});

afterAll(() => {
  delete global.jest;
  delete global.window.jest;
});

vi.mock("$app/stores", async () => {
  const { readable, writable } = await import("svelte/store");
  /**
   * @type {import('$app/stores').getStores}
   */
  const getStores = () => ({
    navigating: readable(null),
    page: readable({ url: new URL("http://localhost"), params: {} }),
    session: writable(null),
    updated: readable(false),
  });
  /** @type {typeof import('$app/stores').page} */
  const page = {
    subscribe(fn) {
      return getStores().page.subscribe(fn);
    },
  };
  /** @type {typeof import('$app/stores').navigating} */
  const navigating = {
    subscribe(fn) {
      return getStores().navigating.subscribe(fn);
    },
  };
  /** @type {typeof import('$app/stores').session} */
  const session = {
    subscribe(fn) {
      return getStores().session.subscribe(fn);
    },
  };
  /** @type {typeof import('$app/stores').updated} */
  const updated = {
    subscribe(fn) {
      return getStores().updated.subscribe(fn);
    },
  };
  return {
    getStores,
    navigating,
    page,
    session,
    updated,
  };
});
