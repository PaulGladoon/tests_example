const verifyEmail_page = require('../page-objects/verify-email_page.js');

let EC = protractor.ExpectedConditions; // assert protractor expected conditions
let scrollIntoView = function () { // scroll to view web_element
    arguments[0].scrollIntoView();
};

module.exports = {

    continueRegistration
};

async function continueRegistration() {

    await browser.executeScript(scrollIntoView, verifyEmail_page.continueRegBtn());
    await verifyEmail_page.continueRegBtn().click();
}