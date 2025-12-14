const express=require('express')
const router=express.Router()
const profile=require('../controller/User/Profile')
const upload=require('../middleware/multer')
const auth=require("../middleware/auth")

router.put("/",auth,upload.single("profileImage"),profile)

module.exports=router