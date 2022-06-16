const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const userRoute = require('./user/user.route')

mongoose.connect('mongodb://localhost:27017/test-node',(error,result) => {
    if(error) {
        console.log("Error while connecting to DB ",error.message)
    }
    else {
        console.log("Successfully connected to DB!")
    }
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/api/user', userRoute)

app.listen(8000, () => console.log("app is listening on port 8000"))