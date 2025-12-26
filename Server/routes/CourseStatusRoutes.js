const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const courseStatusToggle=require("../controller/Educator/CourseStatusToggle")

router.put("/", auth, courseStatusToggle);

module.exports = router;
