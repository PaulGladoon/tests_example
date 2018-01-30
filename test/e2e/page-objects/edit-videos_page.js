const editVideos_page = function () {

    this.mainVideoLocationField = function () {
        return $('.at-block-1 .name-input')
    };

    this.mainVideoHashtagsField = function () {
        return $('.at-block-1 .hashtags-input')
    };

    this.mainVideoUploadViedoBtn = function () {
        return $('.at-block-1 .upload-button')
    };

    this.mainVideoUrlField = function () {
        return $('.at-block-1 .video-url')
    };

    this.mainVideoAddBtn = function () {
        return $('.at-block-1 .add-btn')
    };
};

module.exports = new editVideos_page();