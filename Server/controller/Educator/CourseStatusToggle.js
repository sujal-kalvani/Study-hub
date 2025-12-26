const userModel = require('../../models/User/userModel');
// const courseModel = require('../../models/Educator/CourseModel');

const getCourses = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .populate("createdCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { courseId } = req.body;

    // Find course in createdCourses array
    const course = user.createdCourses.find(
      (c) => c._id.toString() === courseId
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Toggle status
    course.CourseStatus =
      course.CourseStatus === "Live" ? "Private" : "Live";

    // IMPORTANT: save course, not user
    await course.save();

    res.json({
      success: true,
      message: "Course status updated",
      course,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update course" });
  }
};

module.exports = getCourses;
