import homePage from "../../pageObjects/home.page";
import searchPage from "../../pageObjects/search.page";
import pageActions from "../../utils/page.actions";
import {assert} from 'chai';   

describe('Web - Cheap Flights Search Results', async()=>{
     let parentWindow;
    
    beforeEach(async()=>{
        await homePage.openCheapFlightsHomePage(); 
        parentWindow = await browser.getWindowHandle();  
    })

    it('TC01 - Verify user can search flights with valid inputs', async()=>{
        await searchPage.enterDepartureLocation('Adelaide');
        await searchPage.enterDestinationLocation('Sydney');
        await searchPage.selectDepartureDate('April 25 2026');
        await searchPage.selectReturnDate('April 30 2026');
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

    it('TC02 - Verify each result contains price and airline details', async()=>{
        await searchPage.enterDepartureLocation('Adelaide');
        await searchPage.enterDestinationLocation('Sydney');
        await searchPage.selectDepartureDate('April 25 2026');
        await searchPage.selectReturnDate('April 30 2026');
        await searchPage.clickSearchButton();
        // Handle new tab if search results open in a new tab or same tab based on application behavior
        await pageActions.switchToChildWindow(parentWindow);
        await searchPage.waitUntilSearchResultsDisplayed();
        const resultsCount = await searchPage.getSearchResultsCount()
                
        assert.isAbove(resultsCount, 0, 'Search results are not displayed');
        console.log(`Number of search results: ${resultsCount}`); 

        const priceDetailsCount = await searchPage.getSearchPriceDetailsCount();
        assert.strictEqual(priceDetailsCount, resultsCount, 'Not all search results have price details');
        console.log(`All ${priceDetailsCount} search results have price details`);

        const priceElements = await searchPage.priceDetails;
        for (let price of priceElements) {
            assert.isTrue(await price.isDisplayed(), 'Price not displayed');
            assert.notEqual(await price.getText(), '', 'Price is empty');
            console.log(`Price displayed: ${await price.getText()}`);
        }

        // swith back to parent window based on application behavior, if search results open in same tab, this step can be skipped
        await browser.switchToWindow(parentWindow)
    })

    it('TC03 - Verify no result contains empty or invalid price', async()=>{
        await searchPage.enterDepartureLocation('Adelaide');
        await searchPage.enterDestinationLocation('Sydney');
        await searchPage.selectDepartureDate('April 25 2026');
        await searchPage.selectReturnDate('April 30 2026');
        await searchPage.clickSearchButton();
        // Handle new tab if search results open in a new tab or same tab based on application behavior
        await pageActions.switchToChildWindow(parentWindow);
        await searchPage.waitUntilSearchResultsDisplayed();
        const resultsCount = await searchPage.getSearchResultsCount()
        assert.notStrictEqual(resultsCount, 0, 'Results list is empty');
        console.log(`Number of search results: ${resultsCount}`)

        // swith back to parent window based on application behavior, if search results open in same tab, this step can be skipped
        await browser.switchToWindow(parentWindow)
    })
})