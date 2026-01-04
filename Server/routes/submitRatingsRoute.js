const express =require("express")
const router=express.Router()
const submitRatings=require("../controller/User/submitRatings")
const auth=require('../middleware/auth')

router.post("/",auth,submitRatings)
module.exports=router