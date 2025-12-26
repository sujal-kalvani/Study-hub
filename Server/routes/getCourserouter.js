const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const getCourses = require("../controller/Educator/GetCourses");

router.get("/", auth, getCourses);

module.exports = router;
