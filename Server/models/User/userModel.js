const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,

    role: {
      type:String,
    },
   
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
