import { describe, it, expect, vi, beforeEach } from "vitest";

const { buildSitemapMock } = vi.hoisted(() => ({ buildSitemapMock: vi.fn() }));

vi.mock("./sitemap", () => ({ buildSitemap: buildSitemapMock }));

const loadCacheModule = () => import("./sitemapCache");

describe("GIVEN sitemapCache.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    buildSitemapMock.mockReset();
    vi.useRealTimers();
  });

  it("WHEN getSitemap is called twice THEN the sitemap is only built once", async () => {
    buildSitemapMock.mockResolvedValue("<urlset/>");
    const { getSitemap } = await loadCacheModule();

    expect(await getSitemap("http://api")).toBe("<urlset/>");
    expect(await getSitemap("http://api")).toBe("<urlset/>");
    expect(buildSitemapMock).toHaveBeenCalledTimes(1);
  });

  it("WHEN the TTL has expired THEN the sitemap is rebuilt", async () => {
    vi.useFakeTimers();
    buildSitemapMock
      .mockResolvedValueOnce("<one/>")
      .mockResolvedValueOnce("<two/>");
    const { getSitemap, CACHE_TTL_MS } = await loadCacheModule();

    expect(await getSitemap("http://api")).toBe("<one/>");

    vi.setSystemTime(Date.now() + CACHE_TTL_MS + 1);

    expect(await getSitemap("http://api")).toBe("<two/>");
    expect(buildSitemapMock).toHaveBeenCalledTimes(2);
  });

  it("WHEN a rebuild fails THEN the stale sitemap is returned", async () => {
    vi.useFakeTimers();
    buildSitemapMock
      .mockResolvedValueOnce("<one/>")
      .mockRejectedValueOnce(new Error("boom"));
    const { getSitemap, CACHE_TTL_MS } = await loadCacheModule();

    expect(await getSitemap("http://api")).toBe("<one/>");

    vi.setSystemTime(Date.now() + CACHE_TTL_MS + 1);

    expect(await getSitemap("http://api")).toBe("<one/>");
  });

  it("WHEN there is no cache and the build fails THEN it throws", async () => {
    buildSitemapMock.mockRejectedValue(new Error("boom"));
    const { getSitemap } = await loadCacheModule();

    await expect(getSitemap("http://api")).rejects.toThrow("boom");
  });

  it("WHEN warmSitemapCache fails THEN it does not throw", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    buildSitemapMock.mockRejectedValue(new Error("boom"));
    const { warmSitemapCache } = await loadCacheModule();

    await expect(warmSitemapCache("http://api")).resolves.toBeUndefined();

    consoleError.mockRestore();
  });

  it("WHEN concurrent calls happen THEN they share a single build", async () => {
    let resolveBuild: (xml: string) => void = () => {};
    buildSitemapMock.mockReturnValue(
      new Promise<string>((resolve) => {
        resolveBuild = resolve;
      }),
    );
    const { getSitemap } = await loadCacheModule();

    const first = getSitemap("http://api");
    const second = getSitemap("http://api");
    resolveBuild("<shared/>");

    expect(await first).toBe("<shared/>");
    expect(await second).toBe("<shared/>");
    expect(buildSitemapMock).toHaveBeenCalledTimes(1);
  });
});
