const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema({
  timestamp: Date,
  path: String,
  success: Boolean,
  logType: String,
});

const BrowserEventLogModel = mongoose.model(
  "BrowserEventLog",
  new Schema({
    ...logSchema.obj, // inherit properties from base schema
    eventType: String,
  })
);

module.exports = BrowserEventLogModel;
