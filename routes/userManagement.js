const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/ping", async (req, res) => {
  res
    .status(200)
    .json({ message: "Connected to User Management API", req: req.body });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        res.status(200).json({ message: "User logged in successfully", user });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to log in user" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password, userType } = req.body;
  try {
    const user = await User.create({ username, email, password, userType });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;
