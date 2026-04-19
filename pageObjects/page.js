
import platform from '../utils/platform.js';
import pageActions from '../utils/page.actions.js';

export default class basePage {

    async open () {
        await browser.url(browser.options.baseUrl);
        // Clear storage (mobile browser retains data)
        await browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        // Clear cookies
        await browser.deleteAllCookies();
        const isMobile = platform.isMobile()
        if(!isMobile){ await browser.maximizeWindow()}
        await pageActions.waitForDocumentToLoad()
    }
}   