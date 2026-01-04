const chapter = require('../../models/Educator/ChapterModel')
const mongoose=require('mongoose')

const getTutorials = async (req, res) => {

    const chapters = await chapter.find({
        courseId: new mongoose.Types.ObjectId(req.params.id),
    });

    // console.log(chapters);

    try {
        res.status(200).json({
            success: true,
            chapters
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get chapters",
        });
    }

}
module.exports = getTutorials