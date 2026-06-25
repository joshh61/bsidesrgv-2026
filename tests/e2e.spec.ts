import { expect, test } from "@playwright/test";
import { source as axeSource } from "axe-core";

declare global {
  interface Window {
    axe: {
      run: (
        context: Document,
        options: unknown,
      ) => Promise<{
        violations: Array<{
          id: string;
          impact?: string | null;
          description: string;
          nodes: Array<{ target: string[] }>;
        }>;
      }>;
    };
  }
}

const sectionLinks = [
  ["Details", "details"],
  ["CFP", "cfp"],
  ["Agenda", "agenda"],
  ["Activities", "activities"],
  ["Sponsors", "sponsors"],
  ["Venue", "venue"],
  ["Conduct", "conduct"],
] as const;

test.beforeEach(async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      if (!text.includes("/_next/webpack-hmr")) {
        consoleErrors.push(text);
      }
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1600);

  expect(consoleErrors, "browser console errors").toEqual([]);
});

test("homepage renders the attendee-critical content without an error overlay", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Cybersecurity. Community. South Texas." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Register on Eventbrite/ }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "BSides RGV runs on community support." })).toBeVisible();

  await expect(page.getByText("Application error")).toHaveCount(0);
  await expect(page.getByText("Unhandled Runtime Error")).toHaveCount(0);
  await expect(page.getByText("Build Error")).toHaveCount(0);
});

test("desktop navigation anchors reach each major section", async ({ page }) => {
  const header = page.locator("header");

  for (const [label, id] of sectionLinks) {
    await header.getByRole("link", { name: label, exact: true }).click();
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(`#${id}`);
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("mobile menu opens, exposes attendee links, and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("domcontentloaded");

  const openButton = page.getByRole("button", { name: "Open menu" });
  await expect(openButton).toBeVisible();
  await openButton.click();

  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Agenda" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Sponsors" })).toBeVisible();
  await expect(page.locator("header").getByRole("link", { name: "Register on Eventbrite" })).toBeVisible();

  await mobileNav.getByRole("link", { name: "Agenda" }).click();
  await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#agenda");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("header bar does not overflow on phone widths", async ({ page }) => {
  // Regression guard: the Register CTA's base `inline-flex` once beat its
  // `hidden` class, leaving a 147px button on the bar that pushed the nav off
  // the right edge on iPhones. The whole bar must fit within the viewport.
  for (const width of [360, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => {
      const nav = document.querySelector("header nav");
      return nav ? nav.scrollWidth - nav.clientWidth : -1;
    });
    expect(overflow, `header overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test("clicking a speaker carousel card opens that speaker's page", async ({ page }) => {
  // Regression guard: the carousel called setPointerCapture on mouse
  // pointerdown, which retargeted the click to the scroll container so a
  // plain mouse click never reached the card's <a> and never navigated.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const card = page.locator('#speakers a[href^="/speakers/"]').first();
  await card.scrollIntoViewIfNeeded();
  const href = await card.getAttribute("href");
  await card.click();
  await page.waitForURL(`**${href}`, { timeout: 5000 });
  expect(page.url()).toContain(href!);
});

test("dragging across a speaker card does not navigate into it", async ({ page }) => {
  // The flip side of the click fix: a real mouse drag (past the 6px threshold)
  // must still be suppressed so it scrolls instead of opening a card.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const track = page.getByTestId("speakers-track");
  await track.scrollIntoViewIfNeeded();
  const box = (await track.boundingBox())!;
  await page.mouse.move(box.x + box.width - 40, box.y + box.height / 2);
  await page.mouse.down();
  for (let x = 0; x <= 220; x += 20) {
    await page.mouse.move(box.x + box.width - 40 - x, box.y + box.height / 2);
  }
  await page.mouse.up();
  await page.waitForTimeout(300);
  expect(page.url(), "a drag must not navigate into a card").toMatch(/\/$/);
});

test("external attendee links are safely configured", async ({ page }) => {
  const badLinks = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>("a[href^='http']")]
      .filter((link) => link.target !== "_blank" || link.rel !== "noopener noreferrer")
      .map((link) => ({ href: link.href, text: link.textContent?.trim() })),
  );

  expect(badLinks).toEqual([]);
});

test("sponsor logo links remain accessible by image alt text", async ({ page }) => {
  // The sponsor wall is an auto-scrolling marquee that cycles logos in and out
  // of an overflow-hidden band, so any single logo's on-screen visibility is
  // transient by design. What this test guards is accessibility: each sponsor
  // stays reachable as a link whose accessible name comes from its logo alt
  // text. (axe covers a11y violations separately.)
  for (const sponsor of ["Arctic Wolf", "Cisco", "Fortinet", "Sequel Data", "SentinelOne", "CrowdStrike"]) {
    await expect(page.getByRole("link", { name: sponsor })).toBeAttached();
  }
});

test("axe has no serious or critical attendee-facing accessibility violations", async ({ page }) => {
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "best-practice"],
      },
    });
  });

  const seriousViolations = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );

  expect(
    seriousViolations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});
