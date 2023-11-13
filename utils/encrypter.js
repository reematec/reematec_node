const crypto = require('crypto');

const algorithm = "aes-256-cbc";


// const key = crypto.randomBytes(32);
const key = '12345678123456781234567812345678';
// const iv = crypto.randomBytes(16);
const iv = '1234567812345678';

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decryptedData = decipher.update(hash, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData
};

module.exports = { encrypt, decrypt };