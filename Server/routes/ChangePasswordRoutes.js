const express = require("express");
const router = express.Router();
const changePassword=require("../controller/User/ChangePassword")

router.post("/",changePassword);

module.exports = router;
