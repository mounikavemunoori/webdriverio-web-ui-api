import pageActions from "../utils/page.actions"
import {assert} from 'chai';

class SearchPage {
    get fromOriginInput () { return $('input[aria-label="Origin location"]') }
    get fromOriginInputClearButton () { return $('[aria-label="Flight origin input"] div[aria-label="Remove value"]')}
    get toDestinationInput () { return $('input[aria-label="Destination location"]') }
    get toDestinationInputClearButton () { return $('[aria-label="Flight destination input"] [aria-label="Remove value"]')}
    get departureDateInput () { return $('[aria-label="Departure date"]') }
    get returnDateInput () { return $('[aria-label="Return date"]') }
    get travelersInput () { return $('[aria-label="Trip type"]') }
    get travelersDropdown() { return $('//div[contains(@class, "dropdown")]') }
    get searchButton() { return $('button[aria-label="Search"]')}
    get loadingSpinner() { return $('.loading-spinner')}
    get loadingSpinnerText() { return $('//*[contains(text(), "Loading")]')}
    get bookNowText() { return $('//div[@role="region"]//div[contains(@class, "message")]')}
    get searchResults() { return $$('//ol[contains(@class, "list")]')}
    get selectedTravelersCount(){ return $('(//header//div[contains(@class, "travelers")])[2]') }
    get tootTipElement() { return $('[role="tooltip"]')}
    get errorPopup() { return $('//div[@role="dialog" and @aria-modal="true"]//div[contains(@class, "popup")]') }
    get priceDetails() { return $$('//div[contains(@aria-label,"Result item")]//div[contains(@class, "price-tex")]//div[contains(@class, "price-tex")]') }

   selectAirport(airport) {
    return $(`//ul[@aria-haspopup="true" and @role="listbox"]//li[contains(@aria-label,"${airport}")]`)
   }
    selectDate(date) { return $(`//div[contains(@aria-label, '${date}')]`)}
    travellersIncrementButton(travellerType) { return $(`//span[contains(text(), '${travellerType}')]//parent::div//button[@aria-label="Increment"]`) }
    travellersCount(travellerType) { return $(`//span[contains(text(), '${travellerType}')]//parent::div//input`) }
    selectedTravelersCount(){ return $('(//header//div[contains(@class, "travelers")])[2]') }


    async clickOnFromOriginInputClearButton() {
        if(await pageActions.isElementDisplayed(this.fromOriginInputClearButton)) {
            await pageActions.clickElement(this.fromOriginInputClearButton);
        }
    }

    async enterDepartureLocation(location) {
        // if(await pageActions.isElementDisplayed(this.fromOriginInputClearButton)) {
        //     await pageActions.clickElement(this.fromOriginInputClearButton);
        // }
        await this.clickOnFromOriginInputClearButton()
        await pageActions.clickElement(this.fromOriginInput);
        await pageActions.setInputField(this.fromOriginInput, location);
        await pageActions.clickElement(this.selectAirport(location));
    }

    async clickOnToDestinationInputClearButton() {
         if(await pageActions.isElementDisplayed(this.toDestinationInputClearButton)) {
            await pageActions.clickElement(this.toDestinationInputClearButton);
        }
    }

    async enterDestinationLocation(location){
        // if(await pageActions.isElementDisplayed(this.toDestinationInputClearButton)) {
        //     await pageActions.clickElement(this.toDestinationInputClearButton);
        // }
        await this.clickOnToDestinationInputClearButton()
        await pageActions.clickElement(this.toDestinationInput);
        await pageActions.setInputField(this.toDestinationInput, location);
        await pageActions.clickElement(this.selectAirport(location));
    }

    async selectDepartureDate(date) {
        await pageActions.clickElement(this.departureDateInput)
        await pageActions.clickElement(this.selectDate(date))
    }

    async selectReturnDate(date) {
        await pageActions.clickElement(this.returnDateInput)
        await pageActions.clickElement(this.selectDate(date))
    } 

    async clickOnAdditionalTravelers() {
        await pageActions.clickElement(this.travelersInput)
        await pageActions.waitForElementDisplayed(this.travelersDropdown)   

    }

    // async incrementTravellersCount(travellerType) {
    //     await pageActions.waitForElementClickable(this.travellersIncrementButton(travellerType));
    //     await pageActions.clickElement(this.travellersIncrementButton(travellerType));
    // }

    async incrementTravellersCount(travellerType, count) {
        await pageActions.waitForElementClickable(this.travellersIncrementButton(travellerType));
        const currentCount = await this.travellersCount(travellerType).getValue();
        const incrementsNeeded = count - currentCount;
        if(incrementsNeeded > 0) {
            for(let i=0; i<incrementsNeeded; i++) {
                await pageActions.clickElement(this.travellersIncrementButton(travellerType));
            }
        }
    }

    async clickSearchButton() {
        await pageActions.clickElement(this.searchButton)
        await pageActions.waitForElementToDisappear(this.loadingSpinnerText)
        console.log('Search completed, loading spinner disappeared')
    }

    async waitUntilBookNowTextDisplayed() {
        await pageActions.waitForElementDisplayed(this.bookNowText, 30000)
    }

    async getSearchResultsCount() {
        return await this.searchResults.length;
    }

    async waitUntilSearchResultsDisplayed(){
        await browser.waitUntil(
            async () => (await this.searchResults.length) > 0,
            { timeout: browser.options.waitforTimeout, timeoutMsg: 'Expected search results to be displayed', interval: 1000 }
        );
    }
    
    async verifySearchResultsRelevant(location) {
        const results = await this.searchResults;
        for (const list of results) {
            const locationElement = await list.$(`.//li//div[contains(@title, "${location}")]`);
            if (await locationElement.isDisplayed()) {
                console.log(`Found ${location}`);
                console.log(`Search results are relevant to the departure location: ${await locationElement.getText()}`);
            }
            const actualLocation = await locationElement.getText()
            assert.include(actualLocation, location, `Search result ${actualLocation} does not include location ${location}`);
            console.log(`Search result ${actualLocation} includes location ${location}`);
        }
    }

    async getSelectedTravelersCount() {
        const el = await browser.$('(//header//div[contains(@class, "travelers")])[2]');
         return await el.getAttribute('aria-label');
    }

    async getErrorPopupMessage() {
        await pageActions.waitForElementDisplayed(this.errorPopup);
        return await pageActions.getElementText(this.errorPopup);
    }

    async getSearchPriceDetailsCount() {
        return await this.priceDetails.length;
    }

}

export default new SearchPage();