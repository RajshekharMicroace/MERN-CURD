const mongoose = require("mongoose")
require('dotenv').config();

async function connectToDb () {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('connected');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb