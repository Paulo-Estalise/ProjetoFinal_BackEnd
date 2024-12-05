const crypto = require('crypto');

const generateCode = () => {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
};

module.exports = generateCode;
