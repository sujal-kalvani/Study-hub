const express = require("express");
const router = express.Router();
const VerifyOtp=require("../controller/User/verifyOtp")

router.post("/",VerifyOtp);

module.exports = router;
