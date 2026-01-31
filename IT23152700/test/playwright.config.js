module.exports = {
  testDir: "./tests",
  use: {
    headless: false,  // so you can SEE it run
    viewport: { width: 1280, height: 720 }
  },
  timeout: 60_000
};
