const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const getEnrolledCourses=require("../controller/User/getEnrolledCourses")

router.get("/",auth,getEnrolledCourses);

module.exports = router;