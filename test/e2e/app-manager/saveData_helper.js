const fs = require('fs');
const path = require('path');
const artistData = require('../model-objects/artist_data.js');

module.exports = {

    userCreds
};

function userCreds() {
    return new Promise((resolve, reject) => {
        fs.appendFile(path.resolve('./resources/email.txt'), `\n${artistData.email+' '+new Date()}`, function (err) {
            if (err) {
                reject()
            } else {
                console.log('Creds was saved');

                resolve()
            }
        });
    })
}