const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    otp:{type:Number,default:null},
    otpExpiresAt:{type:Date, default:null},

    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student"
    },

    profileImage: {
      type: String,
      default: ""
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],

    createdCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],

    progress: {
      type: Object,
      default: {}
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
