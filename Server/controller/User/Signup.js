const usermodel=require("../../models/User/userModel")
const bcrypt = require("bcrypt")

async function signupController(req,res)
{
    try
    {
        const { name, email, password } = req.body 

        const user=await usermodel.findOne({email})

        if(!name)
        {
            throw new Error("Username is required");   
        }

        if(user)
        {
            throw new Error("This email is already registered");
        }

        if(!password)  
        {
            throw new Error("Password is required");
        }

        const hashPassword = await bcrypt.hashSync(password, 10);

        if(!hashPassword){
            throw new Error("Something is wrong!")
        }

         const payload = {
            ...req.body,
            password : hashPassword
        }

        
        const userData = new usermodel(payload)
        const saveUser = await userData.save()

        res.status(200).json({
            data : saveUser,
            error : false,
            success : true,
            message : "Sign Up Successfully"
        })
            
    }catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports=signupController
