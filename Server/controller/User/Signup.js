const usermodel=require("../../models/User/userModel")

async function signupController(req,res)
{
    try
    {
        console.log(req.body);
        
    }catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports=signupController
