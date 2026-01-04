const express = require("express");
const router = express.Router();
const getRatings=require("../controller/User/getRatings")

router.post("/",getRatings);

module.exports = router;