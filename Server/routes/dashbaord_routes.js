const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dashboard=require("../controller/Educator/Dashboard")

router.get("/",auth,dashboard);

module.exports = router;