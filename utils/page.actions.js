
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
        return await element.getText()
    }

     /**
     * Waits for an element to be clickable
     * @param {WebdriverIO.Element} element
     * @returns {Promise<void>}
     */
    async waitForElementClickable(element) {
        await element.waitForClickable({
            timeout: browser.options.waitforTimeout
        })
    }
}

export default new PageActions()