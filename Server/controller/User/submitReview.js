const Course = require("../../models/Educator/CourseModel")

const submitReviews = async (req, res) => {

    try {
        const userId = req.userId;
        const { id: courseId, review } = req.body;

        // console.log(req.body);

        if (!review) {
            return res.status(400).json({ message: "Review is required" });
        }

        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    reviews: {
                        userId,
                        review
                    }
                }
            }
        );

        res.json({ message: "Review added successfully" });



    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = submitReviews