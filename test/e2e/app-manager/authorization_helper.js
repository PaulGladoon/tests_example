const registration_page = require('../page-objects/registration_page.js');
const accountInfo_page = require('../page-objects/account-info_page.js');


let EC = protractor.ExpectedConditions; // assert protractor expected conditions
let scrollIntoView = function () { // scroll to view web_element
    arguments[0].scrollIntoView();
};

module.exports = {

    artistInfoFillingIn,
    registrationViaEmail,

};

async function artistInfoFillingIn(artist_data) {

    await accountInfo_page.artistBtn().click();
    await accountInfo_page.individualBtn().click();
    await accountInfo_page.emailField().sendKeys(artist_data.email);
    await accountInfo_page.passwordField().sendKeys(artist_data.password);
    await accountInfo_page.confirmPasswordField().sendKeys(artist_data.password);
    await accountInfo_page.confirmAgeCheckbox().click();
    await accountInfo_page.modalConfirmBtn().click();
    await browser.wait(EC.invisibilityOf(accountInfo_page.skylightOverlay()), 10000);
    await accountInfo_page.informedNewsCheckbox().click();

    await browser.executeScript(scrollIntoView, accountInfo_page.gigPolicyCheckbox());
    await accountInfo_page.gigPolicyCheckbox().click();
    await browser.executeScript(scrollIntoView, accountInfo_page.registerBtn());
    await accountInfo_page.registerBtn().click();
}

async function registrationViaEmail() {

    await browser.executeScript(scrollIntoView, registration_page.emailRegBtn());
    await registration_page.emailRegBtn().click();
}

