const profilePhoto_page = function () {

    this.avatarPictureInput = function () {
      return $('#upload_profile_picture');
    };

    this.coverPhotoInput = function () {
        return $('#upload_cover_photo');
    };

    this.cardPhotoInput = function () {
        return $('#upload_preview_avatar');
    };

};

module.exports = new profilePhoto_page();