const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AddCourse=require("../controller/Educator/AddCourses")
const upload=require("../middleware/multer")

router.post("/",auth,upload.single("thumbnail"),AddCourse);

module.exports = router;
