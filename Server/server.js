const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(cors({
    origin: process.env.Fronted_url,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', require("./routes/home.js"))
app.use('/signup', require("./routes/Signup_routes.js"))

// connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
