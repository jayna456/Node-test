const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    image: String,
    gender: String,
    phoneNumber: String
})

module.exports = mongoose.model('user',newSchema, 'user')