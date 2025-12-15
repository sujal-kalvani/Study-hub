const userModel = require("../../models/User/userModel")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    //   service: "gmail",
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_KEY,
    },
});


async function ChangePasswordController(req, res) {

    transporter.verify((error, success) => {
        if (error) {
            console.log("SMTP ERROR ❌", error);
        } else {
            console.log("SMTP READY ✅");
        }
    });

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: 'enter your email' })
    }

    try {
        const userfind = await userModel.findOne({ email: email })

        console.log("userfind", userfind);

        if (userfind) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            userfind.otp = otp; // Store OTP in the database for verification
            userfind.otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

            await userfind.save();

            const mailoptions = {
                from: "sujalkalvani@gmail.com",
                // replyTo:"sujalkalvani@gmail.com",
                to: email,
                subject: "OTP for Password Reset",
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd;">
                        <h2>Hello,</h2>
                        <p>Your One-Time Password (OTP) for verification is:</p>
                        <h1 style="color: #007bff;">${otp}</h1>
                        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                        <p>If you did not request this, please ignore this email.</p>
                        <br>
                        <p>Best regards,<br><strong>Team Study-Hub</strong></p>
                    </div>
                `,
            };

            transporter.sendMail(mailoptions, (error, info) => {
                if (error) {
                    return res.status(401).json({ status: 401, message: "OTP not sent" });
                }
                res.status(201).json({ status: 201, message: "OTP sent successfully" });
            });
        }


    } catch (error) {
        res.status(404).json({ status: 404, message: error })
    }


}
module.exports = ChangePasswordController


// const newPassword = await bcrypt.hash(password, 12);

// // Update password & remove the token
// const updatedUser = await userModel.findByIdAndUpdate({_id:id},{password:newPassword})

// updatedUser.save()

// res.status(201).json({ status: 201, message: "Password updated successfully" });
// } catch (error) {
// res.status(500).json({ status: 500, message: "Internal server error" });")