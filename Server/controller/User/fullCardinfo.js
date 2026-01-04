const courseModel = require("../../models/Educator/CourseModel")

const getcourse = async (req, res) => {

    try {
        const course = await courseModel.findById(req.params.id).populate("educator", "name email");
        // console.log(course);

        
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Courses" });
    }
}

module.exports = getcourse