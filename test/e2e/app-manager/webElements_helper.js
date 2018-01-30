module.exports = {

    getTextElements,
};

function getTextElements(array) {
    return array.then(elements => Promise.all(elements.map(el => el.getText())))
        .then(tags => {
            return tags
        })
        .catch(error => {
            console.log(error)
        });
}