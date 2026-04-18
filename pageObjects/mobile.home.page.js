import pageActions from "../utils/page.actions"

class MobileHomePage {
    get modalPopUpCloseButton () { return $('(//*[@aria-label="Close" and @aria-disabled="false"])[2]')}
    get downloadPrompt () { return $('#appDownloadPrompt')}

    async isDownloadAppPromptDisplayed() {
         return await pageActions.isElementDisplayed(this.downloadPrompt)
    }

    async clickOnModalPopUpCloseButton() {
        await pageActions.clickElement(this.modalPopUpCloseButton)
    }
}

export default new MobileHomePage()