

const userModel = require("../../models/User/userModel");

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("role profileImage name email");

    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

module.exports = getProfile;
