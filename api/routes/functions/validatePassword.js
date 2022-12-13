const bcrypt = require("bcrypt");

async function validatePassword(plainText, hash){
    const isValid = bcrypt.compare(plainText, hash)

    return await isValid
}

module.exports = validatePassword;