import pageActions from "../utils/page.actions"
import mobileHomePage from "./mobile.home.page"

class MobileSearchPage {
    get fromOriginInput() { return $('div[aria-label="Flight origin input"]') }
    get fromWhereInputField() { return $('input[placeholder="From?"]') }
    get toDestinationInput() { return $('div[aria-label="Flight destination input"]')}
    get toWhereInputField () { return $('input[aria-label="Destination location"]')}
    selectAirport(location) { return $(`(//li[contains(@aria-label, '${location}')])[1]`) }
    get selectDatesField() { return $('div[aria-label="Select dates"]') }
    selectDate(date) { return $(`//div[contains(@aria-label, '${date}')]`)}
    get selectThisDate() { return $('//div[contains(text(), "Select this date") or contains(text(), "Select these dates")]') }
    get searchResultsCount() { return $('(//div[contains(.,"results")])[1]')}
    get firstFlightResult() {
        return $('(//div[contains(., "from $")])[1]');
    }
    get travellerOption() { return $('//div[contains(@id,"traveler-type")]')}
    get saveButton() { return $('//div[contains(text(), "Save")]')}
    get travelerscount() { return $('svg[aria-label*="travellers"]')}
    get tavellersText() { return $('svg[aria-label*="traveller') }
    get errorsList() { return $$('//div[contains(@class, "error")]')}
    get searchResultsList () { return $$('//*[contains(text(),"direct") or contains(text(),"h ") or contains(text(),"from $")]')}


    async clickOnFromOriginInput () {
        await pageActions.clickElement(this.fromOriginInput)
    }

    async enterFromWhereLocation (location) {
        await this.clickOnFromOriginInput()
        await pageActions.setInputField(this.fromWhereInputField, location)
        await this.selectAirportLocation(location)
    }

    async clickOnToDestinationInput(){
        await pageActions.clickElement(this.toDestinationInput)
    }

    async enterToWhereLocation(location){
        await this.clickOnToDestinationInput()
        await pageActions.setInputField(this.toWhereInputField, location)
        await this.selectAirportLocation(location)
    }

    async selectAirportLocation(location) {
        if(!location || location.trim()==''){
            await browser.keys(['Enter']);
        } else{
            await pageActions.clickElement(this.selectAirport(location))
        }
    }

    async clickOnSelectDates() {
        await pageActions.clickElement(this.selectDatesField)
    }

    async selectDepartureDate(date) {
        await pageActions.clickElement(this.selectDate(date))
    }
    
    async selectReturnDate(date) {
        await pageActions.clickElement(this.selectDate(date))
    } 

    async clickOnSelectThisDate() {
        await pageActions.clickElement(this.selectThisDate)
    }

    async getSearchResultsCount() {
        await this.waitForResults()
        console.log('Total results found:', await this.searchResultsList.length);
        if (this.searchResultsList.length === 0) {
            throw new Error('No flight results found');
        }
        return await this.searchResultsList.length
    }

    // --- Wait for RESULTS STATE (NOT homepage text) ---
    async waitForResults() {
        await browser.waitUntil(
            async () => {
                const text = await $('body').getText();

                // key indicators of real flight results
                return (
                    text.includes('direct') ||
                    text.includes('h ') ||        // duration like "2h 15m"
                    text.includes('from $')       // price pattern
                );
            },
            {
                timeout: 120000,
                interval: 2000,
                timeoutMsg: 'Flight results not loaded properly'
            }
        );
    }

    async clickOnAddTravellersOption(){
        await pageActions.clickElement(this.travellerOption)
    }

    async clickOnSaveButton() {
        await pageActions.clickElement(this.saveButton)
    }

    async getTravelersCount() {
        await this.waitForTravellers()
        const el = await this.travelerscount
        const value = await el.getAttribute('aria-label')
        return value
    }

     // --- Wait for travellers element (handles re-render) ---
    async waitForTravellers() {
        await browser.waitUntil(
            async () => {
                return await this.tavellersText.isExisting();
            },
            {
                timeout: 60000,
                interval: 2000,
                timeoutMsg: 'Travellers icon not visible'
            }
        );
    }

    async getMissingFieldsErrors() {
        await pageActions.waitForElementDisplayed(this.errorsList[0])
        let errors = []
        for(let i=0;i<await this.errorsList.length;i++){
            const errorText = await pageActions.getElementText(this.errorsList[i])
            errors.push(errorText)
        }
        return errors
    }

}

export default new MobileSearchPage()