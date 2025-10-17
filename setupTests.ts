// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// @ts-ignore
global.jest = vi;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("svelte/transition");
vi.mock("$app/navigation", () => ({
  goto: vi.fn(),
}));

vi.mock("$app/environment", () => ({
  amp: false,
  browser: true,
  dev: true,
  mode: "test",
}));

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
