const accountInfo_page = function () {

    this.artistBtn = function () {
        return $('.at-artist');
    };

    this.individualBtn = function () {
        return $('.at-individual');
    };

    this.emailField = function () {
        return element(by.name('email'));
    };

    this.passwordField = function () {
        return element(by.name('password'));
    };

    this.confirmPasswordField = function () {
        return element(by.name('confirmPassword'));
    };

    this.modalConfirmBtn = function () {
        return $('span.modal__next');
    };

    this.registerBtn = function () {
        return $('.login-btn');
    };

    this.confirmAgeCheckbox = function () {
        return $('.confirm-first');
    };

    this.informedNewsCheckbox = function () {
        return $('.confirm-second');
    };

    this.gigPolicyCheckbox = function () {
        return $('.confirm-third');
    };

    this.skylightOverlay = function () {
        return $('.skylight-overlay');
    };

};

module.exports = new accountInfo_page();