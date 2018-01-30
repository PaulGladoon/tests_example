const personalInfo_page = require('../page-objects/personal-info_page.js');
const plansTalents_page = require('../page-objects/plans-talents_page.js');
const talentInfo_page = require('../page-objects/talent-info_page.js');
const talentDetails_page = require('../page-objects/talent-details_page.js');
const profilePhotos_page = require('../page-objects/profile-photos_page.js');
const editVideos_page = require('../page-objects/edit-videos_page.js');
const editAudio_page = require('../page-objects/edit-audio_page.js');
const editPicture_page = require('../page-objects/edit-pictures_page.js');
const path = require('path');

let EC = protractor.ExpectedConditions; // assert protractor expected conditions
let scrollIntoView = function () { // scroll to view web_element
    arguments[0].scrollIntoView();
};

module.exports = {

    personalInfo,
    plansTalents,
    talentInfo,
    talentDetails,
    profilePhotos,
    editVideos,
    editAudio,
    editPictures

};

async function personalInfo(userData) {

    await personalInfo_page.firstNameField().sendKeys(userData.firstName);
    await personalInfo_page.lastNameField().sendKeys(userData.lastName);
    await personalInfo_page.maleRadioBtn().click();
    await personalInfo_page.dateBirthDaySelect().click();
    await browser.wait(EC.visibilityOf(personalInfo_page.dateBirthDay(userData.birthDay)), 10000);
    await personalInfo_page.dateBirthDay(userData.birthDay).click();

    await browser.wait(EC.invisibilityOf(personalInfo_page.backgroundModelWindow()), 1000);
    await personalInfo_page.dateBirthMonthSelect().click();
    await browser.wait(EC.visibilityOf(personalInfo_page.dateBirthMonth(userData.birthMonth)), 10000);
    await personalInfo_page.dateBirthMonth(userData.birthMonth).click();

    await browser.wait(EC.invisibilityOf(personalInfo_page.backgroundModelWindow()), 1000);
    await personalInfo_page.dateBirthYearSelect().click();
    await browser.wait(EC.visibilityOf(personalInfo_page.dateBirthYear(userData.birthYear)), 10000);
    await browser.executeScript(scrollIntoView, personalInfo_page.dateBirthYear(userData.birthYear));
    await personalInfo_page.dateBirthYear(userData.birthYear).click();
    await personalInfo_page.locationField().sendKeys(userData.location);
    await personalInfo_page.firstResultInLocationField().click();
    await personalInfo_page.buildingNumField().sendKeys(userData.buildingNum);
    await personalInfo_page.zipCodeField().sendKeys(userData.zipCode);
    await personalInfo_page.phoneNumberField().sendKeys(userData.phoneNum);
    await personalInfo_page.cvInput().sendKeys(path.resolve(userData.cvPath));
    
}

async function plansTalents(userData) {

    await plansTalents_page.talentField().sendKeys(userData.talent);
    await plansTalents_page.talentField().click();
    await plansTalents_page.talentItemFirtsResult().click();
    await browser.executeScript(scrollIntoView, plansTalents_page.stylesBlock());

    for (let el of Array.apply(null, { length: 5 })) {
        await plansTalents_page.stylesBlock().click();
    }

    await plansTalents_page.enterANewStyleField().sendKeys(userData.style);
    await plansTalents_page.createStyleBtn().click();

}

async function talentInfo(userData) {

    await talentInfo_page.artisticNameField().sendKeys(userData.artisticName);
    await talentInfo_page.briefIntroductionField().sendKeys(userData.briefIntroduction);
    await talentInfo_page.aboutSectionField().sendKeys(userData.aboutSection);
}

async function talentDetails(userData) {

    await talentDetails_page.normalBookingBtn().click();
    await talentDetails_page.inBusinessMonthsBtn(userData.inBusiness).click();

    await talentDetails_page.primaryFeeField().sendKeys(userData.primaryFee);
    await talentDetails_page.primaryFeePriceSelect().click();
    await browser.wait(EC.visibilityOf(talentDetails_page.primaryFeePriceVelue()), 10000);
    await talentDetails_page.primaryFeePriceVelue().click();
    await browser.sleep(1000); // wait background model window - closed
    await talentDetails_page.primaryFeePricePeriodSelect().click();
    await talentDetails_page.primaryFeePricePeriodVelue(userData.primaryFeePricePeriod).click();

    await talentDetails_page.secondaryFeeField().sendKeys(userData.secondaryFee);
    await browser.sleep(1000); // wait background model window - closed
    await talentDetails_page.secondaryFeePriceSelect().click();
    await browser.wait(EC.visibilityOf(talentDetails_page.secondaryFeePriceValue()), 10000);
    await talentDetails_page.secondaryFeePriceValue().click();
    await browser.sleep(1000); // wait background model window - closed
    await talentDetails_page.secondaryFeePricePeriodSelect().click();
    await talentDetails_page.secondaryFeePricePeriodValue(userData.secondaryFeePricePeriod).click();
    await talentDetails_page.abilityToTravelField().sendKeys(userData.abilityToTravel);
    await browser.executeScript(scrollIntoView, talentDetails_page.abilityToTravelField());
    await talentDetails_page.abilityToTravelValue().click();
    await talentDetails_page.serviceOptionField().sendKeys(userData.serviceOption);
    await talentDetails_page.serviceFeeField().sendKeys(userData.serviceFee);
    await browser.sleep(1000); // wait background model window - closed
    await talentDetails_page.serviceFeePriceSelect().click();
    await browser.wait(EC.visibilityOf(talentDetails_page.serviceFeePriceValue()), 10000);
    await talentDetails_page.serviceFeePriceValue().click();
    await browser.sleep(1000); // wait background model window - closed
    await talentDetails_page.serviceFeePricePeriodSelect().click();
    await talentDetails_page.serviceFeePricePeriodValue(userData.serviceFeePricePeriod).click();

    await browser.sleep(1000); // wait background model window - closed
    for (let i = 1; i < 6; i++) {
        await talentDetails_page.tagsField().sendKeys(userData.tag + `${i}`);
        await talentDetails_page.createNewTagBtn().click();
    }
}

async function profilePhotos(userData) {

    await profilePhotos_page.avatarPictureInput().sendKeys(path.resolve(userData.avatarPicture));
    await profilePhotos_page.coverPhotoInput().sendKeys(path.resolve(userData.coverPhoto));
    await profilePhotos_page.cardPhotoInput().sendKeys(path.resolve(userData.cardPhoto));
}

async function editVideos(userData) {

    await editVideos_page.mainVideoLocationField().sendKeys(userData.mainVideoLocation);
    await editVideos_page.mainVideoHashtagsField().sendKeys(userData.mainVideoHashtag);
    await editVideos_page.mainVideoUploadViedoBtn().click();
    await editVideos_page.mainVideoUrlField().sendKeys(userData.mainVideoUrl);
    await editVideos_page.mainVideoAddBtn().click();
}

async function editAudio(userData) {

    await editAudio_page.firstAudioLocationField().sendKeys(userData.firstAudioLocation);
    await editAudio_page.firstAudioHashtagsField().sendKeys(userData.firstAudioHashtag);
    await editAudio_page.firstAudioUploadBtn().click();
    await editAudio_page.firstAudioUrlField().sendKeys(userData.firstAudioUrl);
    await editAudio_page.firstAudioAddBtn().click();
}

async function editPictures(userData) {

    await editPicture_page.firstPictureLocationField().sendKeys(userData.firstPictureLocation);
    await editPicture_page.firstPictureHashtagsField().sendKeys(userData.firstPictureHashtag);
    await editPicture_page.firstPictureUploadBtn().click();
    await editPicture_page.firstPictureInput().sendKeys(path.resolve(userData.firstPicturePath));
    await editPicture_page.firstPictureAddBtn().click();
}