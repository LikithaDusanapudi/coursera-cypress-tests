const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
  screenshotsFolder: 'cypress/screenshots',   // screenshots saved here
  videosFolder: 'cypress/videos',             // videos saved here
  screenshotOnRunFailure: true,               // auto screenshot on failure
  video: true,                                // record videos
  trashAssetsBeforeRuns: true                 // clean old assets before new run
})
