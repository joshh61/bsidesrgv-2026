import { expect, test } from "@playwright/test";

const ignoredProtocols = ["mailto:"];

test("all same-page anchors point at existing sections", async ({ page }) => {
  await page.goto("/");
  const anchors = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>("a[href^='#']")].map((link) => ({
      href: link.getAttribute("href") ?? "",
      text: link.textContent?.replace(/\s+/g, " ").trim() ?? "",
    })),
  );

  const missing = await page.evaluate((hrefs) => {
    return hrefs.filter((href) => !document.querySelector(href));
  }, anchors.map((anchor) => anchor.href));

  expect(missing).toEqual([]);
});

test("mailto links are well-formed", async ({ page }) => {
  await page.goto("/");
  const mailtoLinks = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>("a[href^='mailto:']")].map((link) =>
      link.getAttribute("href"),
    ),
  );

  expect(mailtoLinks.length).toBeGreaterThan(0);
  for (const href of mailtoLinks) {
    expect(href).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/);
  }
});

test("local PDF and outbound attendee links resolve", async ({ page, request, baseURL }) => {
  await page.goto("/");
  const links = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>("a[href]")]
      .map((link) => link.getAttribute("href") ?? "")
      .filter(Boolean),
  );

  const httpLinks = [...new Set(links)]
    .filter((href) => !ignoredProtocols.some((protocol) => href.startsWith(protocol)))
    .filter((href) => href.startsWith("http") || href.startsWith("/resources/"));

  const failures: Array<{ href: string; status?: number; error?: string }> = [];

  const rootUrl = baseURL ?? "http://127.0.0.1:3002";

  for (const href of httpLinks) {
    const url = href.startsWith("http") ? href : new URL(href, rootUrl).toString();
    try {
      const response = await request.get(url, {
        maxRedirects: 10,
        timeout: 20_000,
        headers: {
          "User-Agent": "BSidesRGV-link-check/1.0",
        },
      });
      if (response.status() >= 400) {
        failures.push({ href: url, status: response.status() });
      }
    } catch (error) {
      failures.push({ href: url, error: error instanceof Error ? error.message : String(error) });
    }
  }

  expect(failures).toEqual([]);
});
