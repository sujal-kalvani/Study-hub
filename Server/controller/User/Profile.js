const userModel = require("../../models/User/userModel");

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware
    const profileImage = req.file
      ? `/images/profile/${req.file.filename}`
      : null;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

module.exports = updateProfile;
