const express = require("express");
const router = express.Router();
const fullcardinfo=require("../controller/User/fullCardinfo")

router.get("/:id",fullcardinfo);

module.exports = router;