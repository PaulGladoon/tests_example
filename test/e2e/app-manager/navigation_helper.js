const main_page = require('../page-objects/main_page.js');
const path = require('path');

let EC = protractor.ExpectedConditions; // assert protractor expected conditions
let scrollIntoView = function () { // scroll to view web_element
    arguments[0].scrollIntoView();
};

module.exports = {

    registrationPage

};

async function registrationPage() {

   await main_page.signUpBtn().click();
}