const userModel = require("../../models/User/userModel");
const jwt = require("jsonwebtoken");

const become_educator = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Already educator check
    if (user.role === "educator") {
      return res.status(400).json({
        message: "You are already an educator",
      });
    }

    // ✅ Update role
    user.role = "educator";
    await user.save();

    // 🔐 Generate new token with updated role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: "You are now an educator",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = become_educator;
