const express = require("express");
const router = express.Router();
const ResetPassword=require("../controller/User/ResetPassword")

router.post("/",ResetPassword);

module.exports = router;
