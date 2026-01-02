const Course= require("../../models/Educator/CourseModel")
const Enrollment=require("../../models/Educator/StudentEnrolled")

const dashboard = async (req, res) => {
  try {
    const educatorId = req.userId;

    // 1️⃣ Total courses created by educator
    const totalCourses = await Course.countDocuments({
      educator: educatorId,
    });

    // 2️⃣ Get all educator courses
    const educatorCourses = await Course.find(
      { educator: educatorId },
      "_id"
    );

    const courseIds = educatorCourses.map(course => course._id);

    // 3️⃣ Total students enrolled
    const totalStudents = await Enrollment.countDocuments({
      course: { $in: courseIds },
      paymentStatus: "paid",
    });

    // 4️⃣ Total earnings
    const earnings = await Enrollment.aggregate([
      {
        $match: {
          course: { $in: courseIds },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalEarning: { $sum: "$amountPaid" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalCourses,
      totalStudents,
      totalEarning: earnings[0]?.totalEarning || 0,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to load educator dashboard",
    });
  }
};
module.exports=dashboard
