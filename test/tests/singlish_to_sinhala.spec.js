const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const URL = "https://www.swifttranslator.com/";
const INPUT_SELECTOR = 'textarea[placeholder="Input Your Singlish Text Here."]';
const OUTPUT_SELECTOR = "div.whitespace-pre-wrap";

const cases = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "testdata", "testCases_minimal.json"), "utf8")
);

function normalize(s) {
  return (s ?? "").replace(/\s+/g, " ").trim();
}

test.describe("Singlish → Sinhala automation (JSON driven)", () => {
  for (const tc of cases) {
    if (tc.category !== "functional") continue;

    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto(URL);

      // Clear input and wait output to clear
      await page.fill(INPUT_SELECTOR, "");
      await page.waitForTimeout(200);

      // Fill input
      await page.fill(INPUT_SELECTOR, tc.input);

      // Wait until output has some text (real-time update)
      await page.waitForFunction(
        (sel) => (document.querySelector(sel)?.textContent ?? "").trim().length > 0,
        OUTPUT_SELECTOR,
        { timeout: 5000 }
      );

      const actual = ((await page.textContent(OUTPUT_SELECTOR)) ?? "").trim();

      expect(normalize(actual)).toBe(normalize(tc.expected));
    });
  }
});
