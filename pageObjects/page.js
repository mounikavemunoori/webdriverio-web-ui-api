
import platform from '../utils/platform.js';
import pageActions from '../utils/page.actions.js';

export default class basePage {

    async open () {
        await browser.url(browser.options.baseUrl)
        const isMobile = platform.isMobile()
        if(!isMobile){ await browser.maximizeWindow()}
        await pageActions.waitForDocumentToLoad()
    }
}   