import BasePage from '../pageObjects/page.js';
import pageActions from '../utils/page.actions.js';


class HomePage extends BasePage {
    get cheapFlightsLogo() { return $('a[aria-label="Go to the cheapflights homepage"]')}
    get signInButton() { return $('div[aria-label="Sign in"]')}  
    get modalWelcomeText() { return $('.unified-login h1')} 
    get modalPopup() { return $$('.unified-login')}
    get modalText() { return $('.unified-login p') }
    get modalCloseButton() { return $('[role="dialog"] button[aria-label="Close"]')}
    loginOptions() { return $$('.unified-login button') }
    loginOption(option) { return $(`//div[contains(text(), "${option}")]`) }


    async openCheapFlightsHomePage() {
        await this.open()
    }

    async isCheapFlightsLogoDisplayed() {
        return await pageActions.isElementDisplayed(this.cheapFlightsLogo);
    }

    async isSignInButtonDisplayed() {
        return await pageActions.isElementDisplayed(this.signInButton);
    }

    async clickSignInButton() {
        await this.safeClick(this.signInButton)
    }

    async getModalWelcomeText() {
        return await pageActions.getElementText(this.modalWelcomeText)
    }

    async waitUntilModalWelComeTextDisplayed() {
        return await pageActions.waitForElementDisplayed(this.modalWelcomeText)
    }

    async getModalText() {
        return await pageActions.getElementText(this.modalText)
    }

    async getLoginOptionsText(options) {
        const optionsText = [];
        for (const option of options) {
            const optionElement = this.loginOption(option);
            await pageActions.waitForElementDisplayed(optionElement);
            const text = await pageActions.getElementText(optionElement);
            optionsText.push(text);
        }
        return optionsText;
    }

    async isLoginOptionDisplayed(option) {
        const optionElement = this.loginOption(option);
        return await pageActions.isElementDisplayed(optionElement);
    }

    async closeLoginModal() {
        await this.safeClick(this.modalCloseButton)
    }

    async modalsCount() {
        return await this.modalPopup.length;
    }

    async safeClick(element) {
        await pageActions.waitForDocumentToLoad()
        await browser.waitUntil(
            async () => await element.isDisplayed(),
                    {
                        timeout: browser.options.waitforTimeout,
                        interval: 500,
                        timeoutMsg: `Element not displayed: ${element.selector}`
                }
        );
        await browser.waitUntil(
            async () => await element.isClickable(),
                    {
                        timeout: browser.options.waitforTimeout,
                        interval: 500,
                        timeoutMsg: `Element not clickable: ${element.selector}`
                }
        );
        await element.scrollIntoView();
        await element.click();
    }
}

export default new HomePage();