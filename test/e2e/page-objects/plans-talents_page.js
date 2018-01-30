const plansTalents_page = function () {

    this.talentField = function () {
        return $('.band-genre-form__search input')
    };

    this.enterANewStyleField = function () {
        return $('.band-genre-form__add-block input')
    };

    this.createStyleBtn = function () {
        return $('.talent-tags-controller__control-add button')
    };

    this.stylesBlock = function () {
        return $('.at-styles-block span')
    };

    this.talentItemFirtsResult = function () {
        return $('[role=menuitem] > div')
    };
};

module.exports = new plansTalents_page();