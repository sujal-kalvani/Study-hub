const courseModel=require("../../models/Educator/CourseModel")

const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find()
    
    if (!courses) {
      return res.status(404).json({ message: "course not found" });
    }

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Courses" });
  }
};

module.exports=getCourses