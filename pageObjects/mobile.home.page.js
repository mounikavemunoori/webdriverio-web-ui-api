import pageActions from "../utils/page.actions"

class MobileHomePage {
    get modalPopUpCloseButton () { return $('(//*[@aria-label="Close" and @aria-disabled="false"])[2]')}
    get downloadPrompt () { return $('#appDownloadPrompt')}

    async isDownloadAppPromptDisplayed() {
         try {
            await pageActions.waitForElementDisplayed(this.downloadPrompt)
         } catch(e) {
            console.log(`Element is not displayed ${e}`)
         }
         return await pageActions.isElementDisplayed(this.downloadPrompt)
    }

    async clickOnModalPopUpCloseButton() {
        await pageActions.waitForElementClickable(this.modalPopUpCloseButton)
        await pageActions.waitForElementDisplayed(this.modalPopUpCloseButton)
        await this.modalPopUpCloseButton.scrollIntoView();
        await pageActions.clickElement(this.modalPopUpCloseButton)
    }
}

export default new MobileHomePage()