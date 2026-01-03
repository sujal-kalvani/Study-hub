const Course= require("../../models/Educator/CourseModel")
const Enrollment=require("../../models/Educator/StudentEnrolled")

const getEnrolledCourses = async (req, res) => {
  try {
    const userId=req.userId
    const courses = await Enrollment.find({user:userId}).populate("course")

    // console.log(courses);
    
    res.status(200).json({
      success: true,
        courses
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to load educator dashboard",
    });
  }
};
module.exports=getEnrolledCourses
