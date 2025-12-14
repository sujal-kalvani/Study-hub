const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const getProfile = require("../controller/User/getProfile");

router.get("/", auth, getProfile);

module.exports = router;
