const Course = require("../../models/Educator/CourseModel")

const submitRatings = async (req, res) => {

    try {
        const userId = req.userId;
        const { id: courseId, value: stars } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingRating = course.ratings.find(
            r => r.userId.toString() === userId.toString()
        );

        if (existingRating) {
            existingRating.stars = stars;
        } else {
            course.ratings.push({ userId, stars });
        }

        const totalStars = course.ratings.reduce((sum, r) => sum + r.stars,0);

        const avgRating = totalStars / course.ratings.length;

     
        course.averageRating = Math.round(avgRating);
 
        course.totalRatings=course.ratings.length

        await course.save();

        res.json({ message: "Rating saved" });


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = submitRatings