const Crypto = require('crypto-js');

function encrypt(data, key) {
    return Crypto.AES.encrypt(data, key).toString();
}

function decrypt(data, key) {
    return Crypto.AES.decrypt(data, key).toString(Crypto.enc.Utf8);
}

module.exports = { encrypt, decrypt };
