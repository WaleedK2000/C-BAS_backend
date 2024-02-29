const mongoose = require("mongoose");
const { Schema } = mongoose;
// base log schema
const logSchema = new Schema({
  timestamp: Date,
  path: String,
  success: Boolean,
  logType: String,
});

const LoginLogModel = mongoose.model(
  "LoginLog",
  new Schema({
    ...logSchema.obj, // inherit properties from base schema
    username: String,
  })
);

module.exports = LoginLogModel;
