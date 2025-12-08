const express =require("express")
const router=express.Router()
const signup = require("../controller/User/Signup.js")

router.post("/",signup)
module.exports=router