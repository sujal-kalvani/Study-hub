const StudentEnrolled = require("../../models/Educator/StudentEnrolled");
require("../../models/Educator/CourseModel"); // 🔥 REQUIRED

const getEducatorEnrollments = async (req, res) => {
  try {
    const educatorId = req.userId;

    const enrollments = await StudentEnrolled.find()
      .populate({
        path: "course",
        match: { educator: educatorId },
        select: "title price",
      })
      .populate("user",)
      .sort({ createdAt: -1 });

      const filteredEnrollments = enrollments.filter(
        (e) => e.course !== null
      );
      
      console.log(filteredEnrollments)

    // console.log("Filtered Enrollments:", filteredEnrollments);

    res.status(200).json({
      success: true,
      enrollments: filteredEnrollments,
    });

  } catch (error) {
    console.error("Enrollments Error:", error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = getEducatorEnrollments;
