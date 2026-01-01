const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const getAllCourses=require("../controller/User/getAllCourses")

router.get("/",getAllCourses);

module.exports = router;
