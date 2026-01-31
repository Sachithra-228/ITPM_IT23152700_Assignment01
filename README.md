# Singlish to Sinhala Translation – Automated Testing

**Student ID:** IT23152700  
**Name:** S K Wijesinghe

---

## Project Overview

Automated functional and UI testing of the **Singlish to Sinhala real-time translation web app** using **Playwright**.

Goals:
- ✅ Validate correct translations for valid Singlish inputs (positive cases)
- ✅ Identify/document limitations for invalid or ambiguous inputs (negative cases)
- ✅ Record execution results using the provided template

Target under test: <https://www.swifttranslator.com/>

---

## Repository Structure

```
IT23152700/
├── IT23152700.csv
├── IT23152700.xlsx
├── repository_link.txt
└── test/
    ├── package.json
    ├── playwright.config.js
    ├── testdata/testCases_minimal.json
    ├── tests/singlish_to_sinhala.spec.js
    ├── test-results/              # Playwright error contexts
    └── gallery-ui/                # Evidence deck (screenshots + videos)
```

---

## Key Files

- `IT23152700.xlsx` – source of final recorded results.  
- `IT23152700.csv` – dataset used to build JSON test cases.  
- `testdata/testCases_minimal.json` – inputs/expectations consumed by Playwright.  
- `tests/singlish_to_sinhala.spec.js` – main Playwright spec (data-driven).  
- `test/gallery-ui/` – Vite/React evidence viewer with all screenshots + videos.

---

## Test Coverage Summary (latest run)

| Test Type            | Count | Result            |
|----------------------|-------|-------------------|
| Positive functional  | 25    | ✅ Passed         |
| Negative functional  | 10    | ❌ Expected fail  |
| UI                   | 2     | ✅ Passed         |
| **Total**            | **37**| **27 Pass / 10 Fail** |

Key limitations observed (negative set):
- Capital letters can break Sinhala mapping.  
- English abbreviations (e.g., TV) transliterated incorrectly.  
- Proper nouns often stay unconverted.  
- Missing spaces cause merged-word errors.  
- Plural suffix “la” can over-transliterate.  
- Ambiguous Singlish spellings yield inconsistent Sinhala.

---

## Installation & Setup

```bash
cd test
npm install
npx playwright install
```

---

## Running Tests

Headless:
```bash
npx playwright test
```

Headed:
```bash
npx playwright test --headed
```

---

## Evidence Deck (screenshots + videos)

The gallery lives at `test/gallery-ui` (Vite/React).

Run locally:
```bash
cd test/gallery-ui
npm install
npm run dev -- --host --port 4173
# open http://localhost:4173
```

Regenerate screenshots + videos for all 37 test cases:
```bash
cd test
npm run capture:media
```
- Screenshots: `test/gallery-ui/public/assets/screens/{id}.png`  
- Videos: `test/gallery-ui/public/assets/videos/{id}.webm`  
- The deck supports status/type filters; Video tab now shows all cases.

**Capture terminal output while you run:**
```bash
cd test
mkdir -p logs
npm run capture:media | tee logs/capture-run-$(date +%Y%m%d-%H%M).log
npx playwright test      | tee logs/test-run-$(date +%Y%m%d-%H%M).log
```
These logs let reviewers see the terminal output alongside the site evidence.

---

## Test Results Recording

Execution outcomes are documented in **IT23152700.xlsx** (Actual Output + Status columns).

---

## Git Repository

Public repo link is stored in `repository_link.txt` (for marking access).

---

## Conclusion

- ✅ Structured, data-driven Playwright tests  
- ✅ Real-time UI interaction and full media capture (screenshots + videos)  
- ✅ Clear evidence deck for reviewers  
- ✅ Documented functional gaps and recorded results aligned with assignment requirements  
