import homePage from "../../pageObjects/home.page";

describe('Web - Cheap Flights Search', async()=>{
    beforeEach(async()=>{
        await homePage.openCheapFlightsHomePage();   
    })
})