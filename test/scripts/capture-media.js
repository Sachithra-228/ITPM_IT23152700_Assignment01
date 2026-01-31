const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.swifttranslator.com/';
const INPUT_SELECTOR = 'textarea[placeholder="Input Your Singlish Text Here."]';
const OUTPUT_SELECTOR = 'div.whitespace-pre-wrap';

const testcases = require('../testdata/testCases_minimal.json');

const outScreens = path.join(__dirname, '..', 'gallery-ui', 'public', 'assets', 'screens');
const outVideos = path.join(__dirname, '..', 'gallery-ui', 'public', 'assets', 'videos');

for (const dir of [outScreens, outVideos]) {
  fs.mkdirSync(dir, { recursive: true });
}

async function captureOne(browser, tc, index) {
  const context = await browser.newContext({
    headless: true,
    viewport: { width: 1366, height: 768 },
    recordVideo: { dir: outVideos, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();

  const logPrefix = `${index + 1}/${testcases.length} ${tc.id}`;
  try {
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });

    await page.fill(INPUT_SELECTOR, '');
    await page.waitForTimeout(200);
    await page.fill(INPUT_SELECTOR, tc.input);

    await page.waitForFunction(
      (sel) => (document.querySelector(sel)?.textContent ?? '').trim().length > 0,
      OUTPUT_SELECTOR,
      { timeout: 12_000 },
    );

    const shotPath = path.join(outScreens, `${tc.id}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });

    const video = page.video();
    await context.close(); // ensures video is saved
    if (video) {
      const src = await video.path();
      const dest = path.join(outVideos, `${tc.id}.webm`);
      fs.renameSync(src, dest);
      console.log(`${logPrefix} captured screenshot + video`);
    } else {
      console.log(`${logPrefix} captured screenshot (no video found)`);
    }
  } catch (err) {
    await context.close();
    console.error(`${logPrefix} failed: ${err.message}`);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (let i = 0; i < testcases.length; i += 1) {
    const tc = testcases[i];
    await captureOne(browser, tc, i);
  }
  await browser.close();
})();
