const express = require("express");
const router = express.Router();
const User = require("../../models/User/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN
async function signin(req, res) {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    
    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // find user
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
    {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports =signin