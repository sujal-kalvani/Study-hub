const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const become_educator = require("../controller/User/Become_educator");

router.put("/", auth, become_educator);

module.exports = router;
