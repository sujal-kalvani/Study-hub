const mongoose = require('mongoose')

async function connectDB() {
    try {
       await mongoose.connect(process.env.mongodb_url,{
        socketTimeoutMS: 45000   
       }) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB