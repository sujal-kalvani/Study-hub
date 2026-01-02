const onlinePayment=require("../controller/User/onlinePayment")
const express =require("express")
const router=express.Router()
const auth=require("../middleware/auth")

router.post("/",auth,onlinePayment)
module.exports=router