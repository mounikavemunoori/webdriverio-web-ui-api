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
    get travelerscount() { return $('[aria-label*="travellers"] + span')}
    get errorsList() { return $$('//div[contains(@class, "error")]')}

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
        const results = await $$('//*[contains(text(),"direct") or contains(text(),"h ") or contains(text(),"from $")]')
        console.log('Total results found:', await results.length);
        if (results.length === 0) {
        throw new Error('No flight results found');
        }
        // console.log('--- Flight Results ---');

        // for (let i = 0; i < results.length; i++) {
        //     const text = await results[i].getText();
        //     console.log(`Result ${i + 1}:`, text);
        // }

        return await results.length;
    }

    // --- Wait for RESULTS STATE (NOT homepage text) ---
    async waitForResults() {
        console.log("search results-->")
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
        const el = await $('svg[aria-label*="travellers"]');
        const value = await el.getAttribute('aria-label');
        console.log(value); // "3 travellers
        return value
    }

     // --- Wait for travellers element (handles re-render) ---
    async waitForTravellers() {
        await browser.waitUntil(
            async () => {
                const el = await $('svg[aria-label*="traveller"]');
                return await el.isExisting();
            },
            {
                timeout: 60000,
                interval: 2000,
                timeoutMsg: 'Travellers icon not visible'
            }
        );
    }

    async getMissingFieldsErrors() {
        let errors = []
        for(let i=0;i<await this.errorsList.length;i++){
            const errorText = await pageActions.getElementText(this.errorsList[i])
            console.log("error text", errorText)
            errors.push(errorText)
        }
        return errors
    }

}

export default new MobileSearchPage()