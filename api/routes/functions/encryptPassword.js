const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword(password){
    let hashedPassword = bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(password, salt);
      })

    return await hashedPassword
}

module.exports = encryptPassword;