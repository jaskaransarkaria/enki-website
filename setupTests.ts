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
//
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
