const express = require("express");
const router = express.Router();
const getTutorials=require("../controller/User/getTutorials")

router.get("/:id",getTutorials);

module.exports = router;