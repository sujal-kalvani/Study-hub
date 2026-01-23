const Course = require("../../models/Educator/CourseModel");

const getRatings = async (req, res) => {
  try {
    const courseId = req.body.id;

    const course = await Course.findById(courseId)
      .select("averageRating ratings reviews createdAt")
      .populate("reviews.userId", "name profileImage"); // 👈 CORRECT

    if (!course) {
      return res.status(404).json({ success: false });
    }

    const reviews = course.reviews.map((r) => ({
      _id: r._id,
      review: r.review,
      createdAt: r.createdAt,
      name: r.userId?.name || "Anonymous",
      profileImage: r.userId?.profileImage || null,
    }));

    res.json({
      success: true,
      r: course.averageRating,
      total_ratings: course.ratings.length,
      date: course.createdAt,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

module.exports = getRatings;
