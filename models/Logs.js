const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new mongoose.Schema({
  timestamp: Date,
  path: String,
  success: Boolean,
  type: String,
});
