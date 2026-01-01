const Chapter = require("../../models/Educator/ChapterModel");

const AddChapter = async (req, res) => {
  try {
    const { courseId, title, duration, youtubeUrl, isPreview } = req.body;

    const chapter = await Chapter.create({
      courseId,
      title,
      duration,
      youtubeUrl,
      isPreview,
      createdBy: req.userId,
    });

    // console.log(chapter);

    res.status(201).json({
      success: true,
      message: "Chapter created successfully",
      chapter,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Chapter creation failed",
      error: error.message,
    });
  }
};

module.exports = AddChapter;
