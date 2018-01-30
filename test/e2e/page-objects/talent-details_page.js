const talentDetails_page = function () {

    this.normalBookingBtn = function () {
      return $('.at-normal')
    };

    this.instantBookingBtn = function () {
        return $('.at-instant')
    };

    this.inBusinessMonthsBtn = function (period) { // 1: 0-6 months; 2: 7-12 months; 3: 1-2 years;
        return $(`.at-m label:nth-child(${period})`)
    };

    this.inBusinessYearsBtn = function (period) { // 1: 3-5 years; 2: 6-9 years; 3: 10+ years;
        return $(`.at-y label:nth-child(${period})`)
    };

    this.primaryFeeField = function () {
        return $('[id*="Primary"]')
    };

    this.primaryFeePriceSelect = function () {
        return $('.price-currency.at-fee_primary');
    };

    this.primaryFeePriceVelue = function () {
        return $('[role=menuitem]')
    };

    this.primaryFeePricePeriodSelect = function () {
        return $('.price-period.at-fee_primary')
    };

    this.primaryFeePricePeriodVelue = function (value) { // 1 - 10 values
        return $(`[role=menu] div:nth-child(${value})`)
    };

    this.secondaryFeeField = function () {
        return $('[id*="Secondary"]')
    };

    this.secondaryFeePriceSelect = function () {
        return $('.price-currency.at-fee_secondary');
    };

    this.secondaryFeePriceValue = function () {
        return $('[role=menuitem]')
    };

    this.secondaryFeePricePeriodSelect = function () {
        return $('.price-period.at-fee_secondary')
    };

    this.secondaryFeePricePeriodValue = function (value) { // 1 - 10 values
        return $(`[role=menu] div:nth-child(${value})`)
    };

    this.abilityToTravelField = function () {
        return $('#business_locations')
    };

    this.backgroundModelWindow = function () {
        return $('body > div:nth-child(5)');
    };

    this.abilityToTravelValue = function () {
        return $('[role=menuitem]')
    };

    this.serviceOptionField = function () {
        return $('[id*=Enteryourtag]')
    };

    this.serviceFeeField = function () {
        return $('[id*=Fee]')
    };

    this.serviceFeePriceSelect = function () {
        return $('.at-price-currency-0')
    };

    this.serviceFeePriceValue = function () {
        return $('[role=menuitem]')
    };

    this.serviceFeePricePeriodSelect = function () {
        return $('.at-price-period-0')
    };

    this.serviceFeePricePeriodValue = function (value) { // 1 - 10 values
        return $(`[role=menu] div:nth-child(${value})`)
    };

    this.tagsField = function () {
        return $('.talent-tags-controller__control-form input')
    };

    this.createNewTagBtn = function () {
        return $('.talent-tags-controller__control-add button')
    };
};

module.exports = new talentDetails_page();