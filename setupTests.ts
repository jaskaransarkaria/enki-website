// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// @ts-expect-error mock out jest with vi
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

vi.mock("$app/env", () => ({
  browser: true,
  building: false,
  dev: true,
  version: "test",
}));

vi.mock("$app/env/public", () => ({
  PUBLIC_BUCKET_URL: "https://storage.googleapis.com/enki-website",
  PUBLIC_SERVER_URL: "http://localhost:8080",
  PUBLIC_STRIPE_KEY: "pk_test_mock",
  PUBLIC_INTERNAL_K8S_URL: "http://localhost:8080",
}));

vi.mock("$app/state", () => ({
  page: {
    url: new URL("http://localhost/"),
    params: {},
    route: { id: null },
    status: 200,
    error: null,
    data: {},
    state: {},
  },
  navigating: { current: null, to: null },
  updated: { current: false },
}));
