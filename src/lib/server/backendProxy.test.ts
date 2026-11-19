import { afterEach, describe, expect, it, vi } from "vitest";
import { proxyToBackend } from "./backendProxy.js";

const backendBaseUrl = "http://localhost:8080";

const makeEvent = (
  path: string,
  init: RequestInit = {},
): { request: Request; url: URL } => ({
  request: new Request(`http://enkionline.com${path}`, init),
  url: new URL(`http://enkionline.com${path}`),
});

describe("GIVEN proxyToBackend", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("WHEN proxying THEN forwards to the backend path and search", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await proxyToBackend(
      makeEvent("/api/enquiry?ref=party", { method: "POST" }),
      "api/enquiry",
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${backendBaseUrl}/api/enquiry?ref=party`,
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("WHEN proxying THEN drops headers that describe the browser request", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await proxyToBackend(
      makeEvent("/api/enquiry", {
        method: "POST",
        headers: {
          host: "enkionline.com",
          origin: "https://enkionline.com",
          referer: "https://enkionline.com/workshops/craft",
          "content-length": "10",
          "x-forwarded-host": "enkionline.com",
          "x-forwarded-proto": "https",
          "x-forwarded-uri": "/api/enquiry",
          forwarded: "host=enkionline.com",
          "x-custom": "keep-me",
        },
      }),
      "api/enquiry",
    );

    const [, init] = fetchMock.mock.calls[0];
    const headers = new Headers(init?.headers);

    for (const dropped of [
      "host",
      "origin",
      "referer",
      "content-length",
      "x-forwarded-host",
      "x-forwarded-proto",
      "x-forwarded-uri",
      "forwarded",
    ]) {
      expect(headers.has(dropped)).toBe(false);
    }
    expect(headers.get("x-custom")).toBe("keep-me");
  });

<<<<<<< HEAD
  it("WHEN proxying THEN bounds the backend request with a timeout", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await proxyToBackend(
      makeEvent("/api/enquiry", { method: "POST" }),
      "api/enquiry",
    );

    const [, init] = fetchMock.mock.calls[0];
    expect(init?.signal).toBeInstanceOf(AbortSignal);
  });

  it("WHEN the backend times out THEN responds 504", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new DOMException("The operation timed out.", "TimeoutError"),
    );

    const response = await proxyToBackend(
      makeEvent("/api/enquiry", { method: "POST" }),
      "api/enquiry",
    );

    expect(response.status).toBe(504);
    expect(await response.text()).toBe("The server took too long to respond.");
  });

  it("WHEN the backend fails for another reason THEN rethrows", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("fetch failed"),
    );

    await expect(
      proxyToBackend(
        makeEvent("/api/enquiry", { method: "GET" }),
        "api/enquiry",
      ),
    ).rejects.toThrow("fetch failed");
  });

  it("WHEN the backend responds THEN drops stale body-length headers", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("ok", {
        status: 200,
        headers: {
          "content-encoding": "gzip",
          "content-length": "2",
          "transfer-encoding": "chunked",
          connection: "keep-alive",
          "x-keep": "yes",
        },
      }),
    );

    const response = await proxyToBackend(
      makeEvent("/api/enquiry", { method: "GET" }),
      "api/enquiry",
    );

    for (const dropped of [
      "content-encoding",
      "content-length",
      "transfer-encoding",
      "connection",
    ]) {
      expect(response.headers.has(dropped)).toBe(false);
    }
    expect(response.headers.get("x-keep")).toBe("yes");
  });
});
