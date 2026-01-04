const Course = require("../../models/Educator/CourseModel")

const getRatings = async (req, res) => {

    try {

        // console.log(req.body);
        const courseId = req.body.id

        const ratings = await Course.findById(courseId).select("averageRating ratings createdAt")

        const r=ratings.averageRating
 
        const total_ratings=ratings.ratings.length

        const date=ratings.createdAt

        res.json({
            r,
            total_ratings,
            date,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
}

module.exports = getRatings