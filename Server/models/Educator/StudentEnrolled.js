const mongoose=require('mongoose')
const { ObjectId } = mongoose.Schema;
const enrolledCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },

    paymentMode: {
      type: String,
      default: "online",
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    stripeSessionId: {
      type: String
    },
    
    paymentIntentId: {
      type: String
    }
  },
  { timestamps: true }
);

const enroll_course= mongoose.model("EnrolledCourse", enrolledCourseSchema);

module.exports=enroll_course