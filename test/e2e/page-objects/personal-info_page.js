const personalInfo_page = function () {

    this.firstNameField = function () {
        return element(by.name('first_name'));
    };

    this.lastNameField = function () {
        return element(by.name('last_name'));
    };

    this.maleRadioBtn = function () {
        return $('#m');
    };

    this.dateBirthDaySelect = function () {
        return $('#day');
    };

    this.dateBirthMonthSelect = function () {
        return $('.month');
    };

    this.dateBirthYearSelect = function () {
        return $('#year');
    };

    this.dateBirthDay = function(day) { // 1 - 30 days
        return $(`[role=menu] > div:nth-child(${day})`);
    };

    this.dateBirthMonth = function(month) { // 1 - 12 months
        return $(`[role=menu] > div:nth-child(${month})`);
    };

    this.dateBirthYear = function(year) { // 1 - 87 years
        return $(`[role=menu] > div:nth-child(${year})`);
    };

    this.locationField = function () {
        return $('#location');
    };

    this.firstResultInLocationField = function () {
        return $('.pac-item');
    };

    this.buildingNumField = function () {
        return $('#location-street_no');
    };

    this.zipCodeField = function () {
        return $('#location-zip');
    };

    this.phoneNumberField = function () {
        return element(by.name('phone_number'));
    };

    this.cvInput = function () {
        return $('[type=file]');
    };

    this.backgroundModelWindow = function () {
        return $('body > div:nth-child(6)');
    };

};

module.exports = new personalInfo_page();