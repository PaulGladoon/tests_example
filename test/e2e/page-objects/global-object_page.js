const globalObject_page = function () {

    this.nextBtn = function () {
        return $('.profile-edit__missing .skip-button');
    };

    this.saveBtn = function () {
        return $('.missing__save');
    };

    this.modalLoader = function () {
        return $('.loader-modal');
    };
};

module.exports = new globalObject_page();