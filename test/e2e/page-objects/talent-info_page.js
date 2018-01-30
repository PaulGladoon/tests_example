const talentInfo_page = function () {

    this.artisticNameField = function () {
        return $('[name=name]')
    };

    this.briefIntroductionField = function () {
        return $('[name=brief_introduction]')
    };

    this.aboutSectionField = function () {
        return $('[name=about]')
    };

};

module.exports = new talentInfo_page();