const userModel = require("../../models/User/userModel");

async function verifyOtp(req, res) {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    const userfind = await userModel.findOne({ email });

    if (!userfind || !userfind.otp || !userfind.otpExpiresAt) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (userfind.otpExpiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    if (userfind.otp.toString() !== otp) {  //Convert stored OTP to string
        return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid, proceed with password reset or authentication
    userfind.otp = null; // Clear OTP after verification
    userfind.otpExpiresAt = null;
    await userfind.save();

    res.json({ message: "OTP verified successfully" });
}

module.exports = verifyOtp;
