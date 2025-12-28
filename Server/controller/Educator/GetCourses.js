const userModel=require('../../models/User/userModel')

const getCourses = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).populate("createdCourses");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Courses" });
  }
};

module.exports=getCourses