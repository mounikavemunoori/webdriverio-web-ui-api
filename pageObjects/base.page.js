
import platform from '../utils/platform.js';

export default class basePage {

    async open () {
        // TODO need to move url to config file
        await browser.url(browser.options.baseUrl);
        const isMobile = platform.isMobile()
        if(!isMobile){ await browser.maximizeWindow()}
        await this.waitForDocumentToLoad()
    }

    //  need to move this method to utils file
    async waitForDocumentToLoad() {
        await browser.waitUntil(async () => {
            const state = await browser.execute(() => document.readyState)
            return state === 'complete'
        }, {
            timeout: 30000,
            timeoutMsg: 'Page is still loading',
            interval: 500
        })
    }
}   