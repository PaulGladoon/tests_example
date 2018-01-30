const editAudio_page = function () {

    this.firstAudioLocationField = function () {
        return $('.at-block-1 .name-input')
    };

    this.firstAudioHashtagsField = function () {
        return $('.at-block-1 .hashtags-input')
    };

    this.firstAudioUploadBtn = function () {
        return $('.at-block-1 .upload-button')
    };

    this.firstAudioUrlField = function () {
        return $('.at-block-1 .audio-url')
    };

    this.firstAudioAddBtn = function () {
        return $('.at-block-1 .add-btn')
    };

};

module.exports = new editAudio_page();

