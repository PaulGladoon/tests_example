const navigationTo = require('../app-manager/navigation_helper.js');
const verify = require('../app-manager/verify_helper.js');
const artist_data = require('../model-objects/artist_data.js');
const fillingIn = require('../app-manager/fillingIn_helper.js');
const global_page = require('../page-objects/global-object_page.js');
const authorization = require('../app-manager/authorization_helper.js');
const savedData = require('../app-manager/saveData_helper.js');
const profile_page = require('../page-objects/profile_page.js');
const webElements = require('../app-manager/webElements_helper.js');

require('events').EventEmitter.defaultMaxListeners = 0; // shutdown max listeners
let EC = protractor.ExpectedConditions; // assert protractor expected conditions
let scrollIntoView = function () { // scroll to view web_element
    arguments[0].scrollIntoView();
};

describe('User authorization', () => {

    beforeAll(() => {
        browser.ignoreSynchronization = true;
        browser.driver.manage().timeouts().implicitlyWait(5000); // wait for element
        browser.driver.manage().window().setSize(1280, 800); // window resolution
    });

    afterAll(() => {
    });

    beforeEach(() => {
    });

    it('[D-TCUA-01] Artist sign up with email', async () => {

        // PREPARE
        let topFiveChipsOnTalentsPage;
        let topFiveChipsOnProfilePage;
        let talentTagsOnDetailsPage;
        let talentTagsOnProfilePage;

        // ACT
        await browser.get('some url');

        await navigationTo.registrationPage();
        await authorization.registrationViaEmail();
        await authorization.artistInfoFillingIn(artist_data);
        await savedData.userCreds();
        await verify.continueRegistration();

            // personal info page
        await fillingIn.personalInfo(artist_data);
        await browser.executeScript(scrollIntoView, global_page.nextBtn());
        await global_page.nextBtn().click();

            // plans&talents page
        await fillingIn.plansTalents(artist_data);
        await browser.executeScript(scrollIntoView, global_page.nextBtn());
        await global_page.nextBtn().click();

            // talent info page
        await fillingIn.talentInfo(artist_data);
        await global_page.nextBtn().click();

            // talent details page
        await fillingIn.talentDetails(artist_data);
        browser.executeScript(scrollIntoView, global_page.nextBtn());
        talentTagsOnDetailsPage = webElements.getTextElements($$('.talent-tags-controller__preview span'));
        await global_page.nextBtn().click();

            // profile photos page
        browser.wait(EC.invisibilityOf(global_page.modalLoader()), 10000);
        await fillingIn.profilePhotos(artist_data);
        await global_page.nextBtn().click();

            // edit videos page
        browser.wait(EC.invisibilityOf(global_page.modalLoader()), 10000);
        await fillingIn.editVideos(artist_data);
        await global_page.nextBtn().click();

            // edit audio page
        browser.wait(EC.invisibilityOf(global_page.modalLoader()), 10000);
        await fillingIn.editAudio(artist_data);
        await global_page.nextBtn().click();

            // edit pictures page
        browser.wait(EC.invisibilityOf(global_page.modalLoader()), 10000);
        await fillingIn.editPictures(artist_data);
        await global_page.saveBtn().click();

            // profile page
        topFiveChipsOnProfilePage = await webElements.getTextElements($$('.profile__talents .talent'));
        talentTagsOnProfilePage = await webElements.getTextElements($$('.about__copy .d-flex span'));
        
        // ASSERT
        expect(profile_page.userFirstAndLastName().getText()).toBe(`${artist_data.firstName+' '+artist_data.lastName}`);
        expect(profile_page.profileName().getText()).toBe(artist_data.artisticName);
        expect(profile_page.profileCategorie().getText()).toBe(artist_data.talent);
        expect(topFiveChipsOnProfilePage).toEqual(topFiveChipsOnTalentsPage);
        expect(talentTagsOnProfilePage).toEqual(talentTagsOnDetailsPage);
    });

});