import homePage from "../../pageObjects/home.page";
import searchPage from "../../pageObjects/search.page";
import pageActions from "../../utils/page.actions";
import mobileHomePage from '../../pageObjects/mobile.home.page.js';
import mobileSearchPage from "../../pageObjects/mobileSearch.page.js";
import { assert } from 'chai';    

describe('Mobile - Cheap Flights Search', async()=> {

    beforeEach(async() => {
        await homePage.openCheapFlightsHomePage()
        if(await mobileHomePage.isDownloadAppPromptDisplayed()){
            await mobileHomePage.clickOnModalPopUpCloseButton()
        }
    })

    it('TC01 - Verify the error handling/messages without entering the required inputs in the search', async()=>{
        await searchPage.clickSearchButton();
        const actualErrors = await mobileSearchPage.getMissingFieldsErrors();
        assert.ok(actualErrors.includes("Please enter a 'To' airport."));
        assert.ok(actualErrors.includes("Please enter a valid 'Depart' date."));
        assert.ok(actualErrors.includes("Please enter a valid 'Return' date. If you wish to search for a one-way flight, please click the 'One-way' button above."));
    })

    it('TC02 - Verify user can search flights with valid inputs', async()=>{
        await mobileSearchPage.enterFromWhereLocation('Adelaide');
        await mobileSearchPage.enterToWhereLocation('Sydney');
        await mobileSearchPage.clickOnSelectDates()
        const startDate = await pageActions.getFormattedDate(1) // today
        const endDate = await pageActions.getFormattedDate(10) // +10 days
        await mobileSearchPage.selectDepartureDate(startDate);
        await mobileSearchPage.selectReturnDate(endDate);
        await mobileSearchPage.clickOnSelectThisDate()
        await searchPage.clickSearchButton();
        await pageActions.waitForDocumentToLoad()
        const resultsCount = await mobileSearchPage.getSearchResultsCount()

        
        assert.isAbove(resultsCount, 0, 'Search results are not displayed');
        console.log(`Number of search results: ${resultsCount}`);   
    })

    it('TC03 - Verify search works with travellers selection', async()=>{
        await mobileSearchPage.enterFromWhereLocation('Adelaide');
        await mobileSearchPage.enterToWhereLocation('Sydney');
        await mobileSearchPage.clickOnSelectDates()
        const startDate = await pageActions.getFormattedDate(1) // today
        const endDate = await pageActions.getFormattedDate(10) // +10 days
        await mobileSearchPage.selectDepartureDate(startDate);
        await mobileSearchPage.selectReturnDate(endDate);
        await mobileSearchPage.clickOnSelectThisDate()
        await mobileSearchPage.clickOnAddTravellersOption();
        await searchPage.incrementTravellersCount('Adults', 3);
        await mobileSearchPage.clickOnSaveButton()
        await searchPage.clickSearchButton();
        await pageActions.waitForDocumentToLoad()
        const resultsCount = await mobileSearchPage.getSearchResultsCount()

        
        assert.isAbove(resultsCount, 0, 'Search results are not displayed');
        console.log(`Number of search results: ${resultsCount}`);   
        // Verifying the travelers count in search results page
        const selectedTravelersText = await mobileSearchPage.getTravelersCount();
        assert.include(selectedTravelersText, '3', `Selected travelers count ${selectedTravelersText} does not include expected count 3`);
        console.log(`Selected travelers count ${selectedTravelersText} includes expected count 3`);
    })

})