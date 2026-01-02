const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const StudentEnrolled=require("../controller/Educator/EnrolledStudents")

router.get("/",auth,StudentEnrolled);

module.exports = router;
