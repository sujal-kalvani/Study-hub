const express = require("express")
const connectDB =require("./config/db")
const app=express()
require('dotenv').config()
const PORT=process.env.PORT || 8000

const home_router = require("./routes/home.js")

// routers
// 1. home router
app.use('/',home_router)


app.use(express.urlencoded({ extended:true }))
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT} port`)
        console.log("connected to db")
    })
})