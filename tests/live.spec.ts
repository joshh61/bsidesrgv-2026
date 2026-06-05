import { expect, test } from "@playwright/test";

// Event day is Sat June 27, 2026 (America/Chicago, CDT = UTC-5). These tests
// mock the browser clock so the page's real Central-time logic is exercised
// exactly as it will run on the day, with no preview hooks in the code.
const atCentral = (hhmm: string) => new Date(`2026-06-27T${hhmm}:00-05:00`);

test.describe("live schedule page", () => {
  test("shows the doors-open state before the conference starts", async ({ page }) => {
    await page.clock.setFixedTime(atCentral("08:30"));
    await page.goto("/live");
    await expect(page.locator('[aria-live="polite"]')).toContainText(/Doors open/i);
  });

  test("shows LIVE NOW with the right rooms during a breakout", async ({ page }) => {
    await page.clock.setFixedTime(atCentral("11:20")); // B-slot, 11:00–11:45
    await page.goto("/live");
    const status = page.locator('[aria-live="polite"]');
    await expect(status).toContainText(/Live now/i);
    await expect(status).toContainText("Breakout Sessions");
    await expect(status).toContainText(/Go to Tangerine/i);
    await expect(status).toContainText(/Go to Lemon/i);
    await expect(status).toContainText(/Go to Key Lime/i);
  });

  test("shows the between-sessions state in a gap", async ({ page }) => {
    await page.clock.setFixedTime(atCentral("16:45")); // after door prize, before reception
    await page.goto("/live");
    await expect(page.locator('[aria-live="polite"]')).toContainText(
      /Between sessions|Up next/i,
    );
  });

  test("shows the wrap-up state after the day ends", async ({ page }) => {
    await page.clock.setFixedTime(atCentral("21:00"));
    await page.goto("/live");
    await expect(page.locator('[aria-live="polite"]')).toContainText(
      /wrap|Thanks for joining/i,
    );
  });

  test("the track filter narrows the live rooms", async ({ page }) => {
    await page.clock.setFixedTime(atCentral("11:20"));
    await page.goto("/live");
    await page.getByRole("button", { name: "Tangerine", exact: true }).click();
    const status = page.locator('[aria-live="polite"]');
    await expect(status).toContainText(/Go to Tangerine/i);
    await expect(status).not.toContainText(/Go to Lemon/i);
  });
});
