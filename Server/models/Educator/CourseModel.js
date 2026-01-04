const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail:
    {
        type: String,
        require: true
    },
    educator: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    studentEnrolled: {
        type: Number,
        default: 0
    },
    CourseStatus: {
        type: String,
        enum: ["Live", "Private"],
        default: "Live"
    },

    isFreePreview: {
        type: Boolean,
        default: false
    },

    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            stars: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            review: {
                type: String,
                trim: true,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    averageRating: {
        type: Number,
        default: 0
    },

    totalRatings: {
        type: Number,
        default: 0
    },
    previewUrl: {
        type: String,
        default: null
    }

},
    { timestamps: true });

const courseModel = mongoose.model("course", courseSchema)

module.exports = courseModel