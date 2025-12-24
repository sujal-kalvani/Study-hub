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
    }
},
{ timestamps: true });

const courseModel=mongoose.model("course",courseSchema)

module.exports=courseModel