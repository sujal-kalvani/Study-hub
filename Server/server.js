const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/images", express.static("images"));

// routes
app.use('/', require("./routes/home.js"))
app.use('/signup', require("./routes/Signup_routes.js"))
app.use("/signin", require("./routes/Signin_routes.js"))
app.use("/profile",require("./routes/Profile_routes.js"))
app.use('/me',require('./routes/getProfileRoutes.js'))
app.use("/ChangePassword",require('./routes/ChangePasswordRoutes.js'))
app.use("/ResetPassword",require('./routes/ResetPasswordRoutes.js'))
app.use("/verifyOtp",require('./routes/VerifyOtpRoutes.js'))
app.use("/become-educator",require("./routes/become_educator_routes.js"))
app.use("/create-course",require('./routes/AddCourses.js'))
app.use("/get-courses",require("./routes/getCourserouter.js"))
app.use("/course-status-toggle",require("./routes/CourseStatusRoutes.js"))
app.use("/course",require('./routes/getFullcardInfo.js'))
app.use("/create-chapter",require("./routes/AddChapter.js"))
app.use("/online-payment",require("./routes/payment_route.js"))
app.use("/get-all-courses",require("./routes/getAllCourseRoute.js"))

// connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
