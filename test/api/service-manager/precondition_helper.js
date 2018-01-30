const apiHelper = require('../service-manager/api_helper.js');

module.exports = {

    randomInteger

};

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}