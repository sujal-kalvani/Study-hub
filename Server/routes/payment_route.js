const onlinePayment=require("../controller/User/onlinePayment")
const express =require("express")
const router=express.Router()


router.post("/",onlinePayment)
module.exports=router