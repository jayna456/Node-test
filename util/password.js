const bcrypt = require('bcrypt')

const generatePassword = (password) => {
    return bcrypt.hashSync(password,10);
}

const verifyPassword = (dbPassword, password) => {
    return bcrypt.compareSync(password,dbPassword)
}

module.exports = { generatePassword, verifyPassword}