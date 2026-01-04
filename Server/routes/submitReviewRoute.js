const express =require("express")
const router=express.Router()
const submitReview=require("../controller/User/submitReview")
const auth=require('../middleware/auth')

router.post("/",auth,submitReview)
module.exports=router