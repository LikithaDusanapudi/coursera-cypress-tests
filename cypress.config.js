const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      // cypressGrepPlugin(config)
      // return config
    },
    video: true,                  // record videos on run
    screenshotOnRunFailure: true, // take screenshots on failure
  },
  env: {
    grepFilterSpecs: true         // enable grep filtering
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  }
})