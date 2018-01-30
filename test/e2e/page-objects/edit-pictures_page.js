const editPictures_page = function () {

    this.firstPictureLocationField = function () {
        return $('.at-block-1 .name-input')
    };

    this.firstPictureHashtagsField = function () {
        return $('.at-block-1 .hashtags-input')
    };

    this.firstPictureUploadBtn = function () {
        return $('.at-block-1 .upload-button')
    };

    this.firstPictureInput = function () {
        return $('.at-block-1 .picture-url')
    };

    this.firstPictureAddBtn = function () {
        return $('.at-block-1 .add-btn')
    };

};

module.exports = new editPictures_page();