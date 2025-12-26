const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail:
    {
        type:String,
        require:true
    },
    educator: {
      type: ObjectId,
      ref: "user",     
      required: true
    },
    Earnings:{
        type:Number,
        default:0
    },
    studentEnrolled:{
        type:Number,
        default:0
    },
    CourseStatus:{
        type:String,
        enum:["Live","Private"],
        default:"Live"
    }
},
{ timestamps: true });

const courseModel=mongoose.model("course",courseSchema)

module.exports=courseModel