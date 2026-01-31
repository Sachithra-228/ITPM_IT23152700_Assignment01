# Singlish to Sinhala Translation – Automated Testing

**Student ID:** IT23152700  
**Name:** S K Wijesinghe

---

## 📌 Project Overview

This project focuses on automated functional and UI testing of a **Singlish to Sinhala real-time translation web application** using **Playwright**.

### The goal is to:

- ✅ Validate correct translations for valid Singlish inputs (Positive test cases)
- ✅ Identify and document system limitations when handling invalid, ambiguous, or inconsistent inputs (Negative test cases)
- ✅ Record execution results using the test case template provided in Appendix 2

**The target system under test is:**  
👉 [https://www.swifttranslator.com/](https://www.swifttranslator.com/)

---

## 📁 Repository Structure

```
IT23152700/
├── IT23152700.csv
├── IT23152700.xlsx
└── test/
    ├── node_modules/
    ├── package-lock.json
    ├── package.json
    ├── playwright.config.js
    ├── test-results/
    │   ├── .last-run.json
    │   ├── singlish_to_sinhala-Singli-228d1--transliterated-incorrectly/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-26313-prevents-correct-conversion/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-3b25f-sh-spelling-for-family-term/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-5f0a5-ration-in-academic-sentence/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-ad6c0-nt-mapping-in-repeated-word/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-ae8ea-d-language-handling-failure/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-c6c10-per-noun-not-transliterated/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-dc601-s-partial-English-retention/
    │   │   └── error-context.md
    │   ├── singlish_to_sinhala-Singli-e6ec1-ace-causes-word-merge-error/
    │   │   └── error-context.md
    │   └── singlish_to_sinhala-Singli-f85ee-eaks-Sinhala-letter-mapping/
    │       └── error-context.md
    ├── testdata/
    │   └── testCases_minimal.json
    └── tests/
        └── singlish_to_sinhala.spec.js
```

---

## 📄 Description of Key Files

### `IT23152700.xlsx`
Contains all test cases and final execution results recorded according to **Appendix 2**.

### `IT23152700.csv`
Source dataset used to construct JSON-based automated test cases.

### `testdata/testCases_minimal.json`
JSON file containing all test cases used by Playwright automation.

### `tests/singlish_to_sinhala.spec.js`
Main Playwright test script that:
- Reads test cases from JSON
- Inputs Singlish text into the website
- Captures Sinhala output
- Validates actual vs expected output

### `test-results/`
Automatically generated Playwright execution artifacts including:
- Failure screenshots
- Error context logs for negative test cases

---

## 🧪 Test Coverage Summary

| Test Type                    | Count | Result              |
|------------------------------|-------|---------------------|
| Positive Functional Tests    | 25    | ✅ Passed           |
| Negative Functional Tests    | 10    | ❌ Failed (Expected)|
| **Total Tests**              | **35**| **✔**              |

### Key Observed Limitations (Negative Tests)

- ❌ Capital letters breaking Sinhala character mapping
- ❌ English abbreviations (e.g., TV) transliterated incorrectly
- ❌ Proper nouns not converted to Sinhala
- ❌ Missing spaces causing merged word errors
- ❌ Plural suffix (la) over-transliteration
- ❌ Ambiguous Singlish spellings producing incorrect Sinhala output

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to the test folder
```bash
cd test
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Install Playwright browsers
```bash
npx playwright install
```

---

## ▶️ Running the Tests

### Run all tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in headless mode
```bash
npx playwright test
```

---

## 📊 Test Results Recording

All execution results have been manually recorded in:

**IT23152700.xlsx**

- **Actual Output** and **Status** columns are filled based on Playwright execution output.

---

## 🔗 Git Repository Access

The full Playwright project repository (including scripts, configuration files, and test data) is **publicly accessible**.

📄 **The Git repository link is provided in a separate text file as required.**

⚠️ **Note:** The repository is public and accessible for marking purposes.

---

## ✅ Conclusion

This project successfully demonstrates:

- ✅ Structured test case design
- ✅ Real-time UI automation using Playwright
- ✅ Accurate identification of functional limitations
- ✅ Proper execution result documentation aligned with assignment guidelines
