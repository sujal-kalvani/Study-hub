const userModel = require("../../models/User/userModel");
const bcrypt = require("bcrypt");

async function ResetPassword(req, res) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required" });
    }

    // Find user by email
    const userfind = await userModel.findOne({ email });

    if (!userfind) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is expired (assuming user.otpExpiresAt exists)
    if (userfind.otpExpiresAt && userfind.otpExpiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    userfind.password = hashedPassword;
    userfind.otp = null; // Clear OTP after successful password reset
    userfind.otpExpiresAt = null;
    await userfind.save();

    res.status(201).json({ status: 201, message: "Password changed successfully" });
}

module.exports = ResetPassword;