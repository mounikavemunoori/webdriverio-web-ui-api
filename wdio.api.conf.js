export const config = {

    runner: 'local',

    specs: [
        './test/api/*.js' // Update this path to point to your api spec files
    ],
    
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless']
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'https://restful-booker.herokuapp.com',

    waitforTimeout: 90000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',

    // FIXED REPORTER (ONLY ONE)
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Screenshot on failure
    afterTest: async function (test, context, { error }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}