const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AddChapters=require("../controller/Educator/AddChapters")

router.post("/",auth,AddChapters);

module.exports = router;