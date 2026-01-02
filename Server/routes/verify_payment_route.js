const express = require("express");
const router = express.Router();
const verifyPayment=require("../controller/Educator/VerifyPayment")
const auth=require("../middleware/auth")

router.post("/",auth,verifyPayment);

module.exports = router;
