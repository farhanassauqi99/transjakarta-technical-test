const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000,
    // ad blocker
    blockHosts: [
      '*google-analytics.com',
      '*googlesyndication.com',
      '*doubleclick.net',
      '*adnxs.com',
      '*criteo.com',
      '*amazon-adsystem.com',
    ],
    experimentalStudio: true,
    setupNodeEvents(on, config) {},
  },
});