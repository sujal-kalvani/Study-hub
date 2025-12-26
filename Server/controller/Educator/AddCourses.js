const Course = require("../../models/Educator/CourseModel");
const User = require("../../models/User/userModel");

const AddCourse = async (req, res) => {
  try {
    const thumbnail = req.file
      ? `/images/courses/${req.file.filename}`
      : null;

    // 1️⃣ Create course in Course collection
    const course = await Course.create({
      title: req.body.title,
      heading: req.body.heading,
      description: req.body.description,
      price: Number(req.body.price),
      thumbnail,
      educator: req.userId
    });

    // 2️⃣ Embed full course object into user's createdCourses
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { createdCourses: course } }, // push entire object
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Course created and embedded successfully",
      course
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Course creation failed" });
  }
};

module.exports = AddCourse;
