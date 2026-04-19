
class PageActions {

     /**
     * Checks if an element is displayed on the UI
     * @param {WebdriverIO.Element} element
     * @returns {Promise<boolean>}
     */
    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed()
        } catch (e) {
            return false
        }
    }

    /**
     * Checks if an element is selected (checkbox, radio, etc.)
     * @param {WebdriverIO.Element} element
     * @returns {Promise<boolean>}
     */
    async isElementSelected(element) {
        return await element.isSelected()
    }

    /**
     * Checks if an element is enabled
     * @param {WebdriverIO.Element} element
     * @returns {Promise<boolean>}
     */
    async isElementEnabled(element) {
        return await element.isEnabled()
    }

    /**
     * Maximizes the browser window
     * @returns {Promise<void>}
     */
    async maximizeWindow() {
        return await browser.maximizeWindow()
    }

    /**
     * Waits until the document readyState becomes 'complete'
     * Ensures page is fully loaded before interaction
     * @returns {Promise<void>}
     */
    async waitForDocumentToLoad() {
        await browser.waitUntil(async () => {
            const state = await browser.execute(() => document.readyState)
            return state === 'complete'
        }, {
            timeout: browser.options.waitforTimeout,
            timeoutMsg: 'Page is still loading',
            interval: 1000
        })
    }
    /**
     * Clicks on an element after ensuring it is clickable
     * @param {WebdriverIO.Element} element
     * @returns {Promise<void>}
     */
    async clickElement(element) {
        await this.waitForElementClickable(element)
        await element.click()
    }

     /**
     * Gets text from an element
     * @param {WebdriverIO.Element} element
     * @returns {Promise<string>}
     */
    async getElementText(element) {
        await this.waitForElementDisplayed(element)
        return await element.getText()
    }

     /**
     * Waits for an element to be clickable
     * @param {WebdriverIO.Element} element
     * @returns {Promise<void>}
     */
    async waitForElementClickable(element, timeout = browser.options.waitforTimeout) {
        await browser.waitUntil(
            async () => await element.isClickable(),
            {
                timeout,
                timeoutMsg: 'Element not clickable'
            }
        );
    }

    /**
     * @Desc Inputs the value to the elements
     * @param element
     * @param value
     * @return None
    */
    async setInputField(element, value) {
        await element.waitForClickable();
        await element.setValue(value);
    }

    /**
     * @Desc Waits for element disabled
     * @param element
     * @return None
     */
    async waitForElementDisplayed(element) {
        await browser.waitUntil(async () => {
            return await element.isDisplayed();
        }, {
            timeout: browser.options.waitforTimeout,
            timeoutMsg: `The following element is not displayed: ${await element.selector}`,
            interval: 500,
        });
    }

    /**
     * Wait until element disappears from UI
     * @param {WebdriverIO.Element} element
     * @param {number} timeout
     */
    async waitForElementToDisappear(element, timeout = browser.options.waitforTimeout) {

        await browser.waitUntil(
            async () => {
                const isExisting = await element.isExisting();
                const isDisplayed = isExisting ? await element.isDisplayed() : false;

                return !isExisting || !isDisplayed;
            },
            {
                timeout: timeout,
                timeoutMsg: 'Element did not disappear within timeout'
            }
        );
    }
    /**
     * 
     * @@param {WebdriverIO.Element} element
     * @param {*} property  attributes of element like aria-label, claass
     * @returns 
     */
    async getElementCSSProperty(element, property) {
        return await element.getAttribute(property);
    }

    /**
     * Switching to child window
     * @param {*} parentWindow 
     */
    async switchToChildWindow(parentWindow){
        const allWindows = await browser.getWindowHandles();
        if(allWindows.length > 1){
            for(let window of allWindows){
                if(window !== parentWindow){
                    await browser.switchToWindow(window);
                    console.log('Switched to separate window');
                    break;
                }
            }
        } else {
            console.log('Same window, no need to switch');
        }
    }

    /**
    * Performs mouse hover on a given element
    * @param {WebdriverIO.Element|string} element - Element or selector
    */
    async mouseHoverOnElement(element) {
        await element.waitForDisplayed()
        await element.moveTo()
    }
    /**
     * Performs Scroll down by 500 pixels
     * @param {*} pixel 
     */
    async scrollToPixel(pixel=500){
        await browser.execute(() => {
            window.scrollBy(0, 500); // Scroll down by 500 pixels
        });
    } 

    /**
     * Usage:Utility to generate formatted date string.
     *
     * getFormattedDate()
     * "April 19 2026"
     *
     * getFormattedDate(1)
     * "April 20 2026"
     *
     * Example:
     * const date = getFormattedDate(3);
     * console.log(date);
    */
    async getFormattedDate(daysToAdd = 0) {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);

        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    }
}

export default new PageActions()