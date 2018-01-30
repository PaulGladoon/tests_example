const profile_page = function () {

    this.userFirstAndLastName = function () {
        return $('.container.align-items-center');
    };

    this.profileName = function () {
        return $('.profile__name');
    };

    this.profileCategorie = function () {
        return $('.profile__categorie-name');
    };
};

module.exports = new profile_page();