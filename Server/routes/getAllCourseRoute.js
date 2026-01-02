const express = require("express");
const router = express.Router();
const getAllCourses=require("../controller/User/getAllCourses")

router.get("/",getAllCourses);

module.exports = router;
