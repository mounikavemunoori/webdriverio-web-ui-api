import homePage from '../../pageObjects/home.page.js';
import {assert} from 'chai';    

describe('Web - Chep flights', ()=>{

    beforeEach(async () => {
        await homePage.openCheapFlightsHomePage();
    });

    it('TC01 - Verify Cheapflights logo is displayed on home page', async()=>{
        assert.isTrue(await homePage.isCheapFlightsLogoDisplayed(), 'Cheap flights logo is not displayed');
        console.log(`Cheap flights logo is displayed`);

    })

    it('TC02 - Verify Sign In button is displayed on home page', async()=>{
        const isSignInButtonDisplayed = await homePage.isSignInButtonDisplayed();
        assert.isTrue(isSignInButtonDisplayed, 'Sign In button is not displayed');
        console.log(`Sign In button is displayed`);
    })

    it('TC03 - Verify login modal opens with correct welcome message', async () => {
        await homePage.clickSignInButton();
        const actualWelcomeText = await homePage.getModalWelcomeText();
        const expectedWelcomeText = 'Welcome to Cheapflights.';
        assert.include(actualWelcomeText, expectedWelcomeText, 'Welcome text is not correct');
        console.log(`Welcome text is correct: ${actualWelcomeText}`);
    });

    it('TC04 - Verify login modal displays correct description text', async () => {
        await homePage.clickSignInButton();
        const actualText = await homePage.getModalText()
        assert.strictEqual(
            actualText,
            'Sign in or create an account to save searches, create Price Alerts, see Private Deals, and more.'
        );
    });

    it('TC05- Verify Sign In Modal shows Login options correctly', async() =>{
        await homePage.clickSignInButton();

        assert.isTrue(await homePage.isLoginOptionDisplayed('Google'), 'Google login option is not displayed');
        console.log(`Google login option is displayed correctly`); 
          
        assert.isTrue(await homePage.isLoginOptionDisplayed('Apple'), 'Apple login option is not displayed');
        console.log(`Apple login option is displayed correctly`); 

        assert.isTrue(await homePage.isLoginOptionDisplayed('Continue with email'), 'Continue with email login option is not displayed');
         console.log(`Continue with email login option is displayed correctly`);  
    })

     it('TC06 - Verify Sign In modal does NOT show incorrect welcome text', async () => {
        await homePage.clickSignInButton();
        const actualWelcomeText = await homePage.getModalWelcomeText()
        const expectedWelcomeText = 'Welcome to Cheap Travel Portal'
        assert.notInclude(actualWelcomeText, expectedWelcomeText, 'Welcome text is not correct')
        console.log(`Welcome text is correct: ${actualWelcomeText}`)
    });

    // TC07 - Modal should not reopen after closing
    it('TC07 - should close login modal properly', async () => {

        await homePage.clickSignInButton();
        await homePage.closeLoginModal();

        const isLoginOptionDisplayed = await homePage.isLoginOptionDisplayed('Google');
        assert.isFalse(isLoginOptionDisplayed, 'Login modal is still displayed after closing');
        console.log(`Login modal is closed properly and not displayed after closing`);
    });
})