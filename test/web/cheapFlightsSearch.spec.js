import homePage from "../../pageObjects/home.page";
import searchPage from "../../pageObjects/search.page";
import pageActions from "../../utils/page.actions";
import {assert} from 'chai';    

describe('Web - Cheap Flights Search', async()=> {
    let parentWindow;

    beforeEach(async() => {
        await homePage.openCheapFlightsHomePage(); 
        parentWindow = await browser.getWindowHandle()
    })

    it('TC01 - Verify user can search flights with valid inputs', async()=>{
        await searchPage.enterDepartureLocation('Adelaide')
        await searchPage.enterDestinationLocation('Sydney')
        const startDate = await pageActions.getFormattedDate(1) // today
        const endDate = await pageActions.getFormattedDate(10) // +10 days
        await searchPage.selectDepartureDate(startDate)
        await searchPage.selectReturnDate(endDate)
        await searchPage.clickSearchButton();
        // Handle new tab if search results open in a new tab or same tab based on application behavior
        await pageActions.switchToChildWindow(parentWindow);
        await searchPage.waitUntilSearchResultsDisplayed();
        const resultsCount = await searchPage.getSearchResultsCount()
        
        assert.isAbove(resultsCount, 0, 'Search results are not displayed');
        console.log(`Number of search results: ${resultsCount}`);   

        // swith back to parent window based on application behavior, if search results open in same tab, this step can be skipped
        await browser.switchToWindow(parentWindow)
    })

    it('TC02 - Verify search works with travellers selection', async()=>{
        await searchPage.enterDepartureLocation('Adelaide')
        await searchPage.enterDestinationLocation('Sydney')
        const startDate = await pageActions.getFormattedDate(1)
        const endDate = await pageActions.getFormattedDate(10)
        await searchPage.selectDepartureDate(startDate)
        await searchPage.selectReturnDate(endDate);
        await searchPage.clickOnAdditionalTravelers();
        await searchPage.incrementTravellersCount('Adults', 3);
        await searchPage.clickSearchButton();
        await pageActions.switchToChildWindow(parentWindow);
        await searchPage.waitUntilSearchResultsDisplayed();

        const resultsCount = await searchPage.getSearchResultsCount();
        assert.isAbove(resultsCount, 0, 'Search results are not displayed');
        console.log(`Number of search results: ${resultsCount}`);   

        const selectedTravelersCount = await searchPage.getSelectedTravelersCount();
        assert.include(selectedTravelersCount, '3', `Selected travelers count ${selectedTravelersCount} does not include expected count 3`);
        console.log(`Selected travelers count ${selectedTravelersCount} includes expected count 3`);
        
        // swith back to parent window based on application behavior, if search results open in same tab, this step can be skipped
        await browser.switchToWindow(parentWindow)
    })

    it('TC03 - Verify the error handling/messages without entering the departure and destination locations in the search', async()=>{
        await searchPage.clickOnFromOriginInputClearButton()
        await searchPage.clickOnToDestinationInputClearButton()
        await searchPage.clickSearchButton();
        const errorMessage = await searchPage.getErrorPopupMessage();
        assert.include(errorMessage, 'An error occurred while trying to perform your search', `Error message ${errorMessage} does not include expected text 'Please enter a destination and departure date'`);
        console.log(`Error message ${errorMessage} includes expected text 'Please enter a destination and departure date'`);
    })

})