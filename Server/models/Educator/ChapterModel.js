const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required:true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        number: {
            type: Number,
        },

        youtubeUrl: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: ["Private", "Live"],
            default: "Private"
        },

       isPreview:{
            type:Boolean,
            default:false,
            required:false
       },
       createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:true
       }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
